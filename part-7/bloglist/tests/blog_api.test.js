const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const Blog = require('../models/Blog');
const User = require('../models/User');
const helper = require('./test_helper');

const api = supertest(app);

describe('when there is no logged-in user', () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    const blogs = helper.initialBlogs.map((blog) => new Blog(blog));
    await helper.addBlogs(blogs);
  });

  test('blogs are correctly returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(helper.initialBlogs.length);
  });

  test('returned blogs have id property', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
  });

  test('a blog can be updated', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToUpdate = blogsAtStart[0];
    const updatedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

    const response = await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog);
    expect(response.body.likes).toBe(updatedBlog.likes);
  });

  test('creation fails with proper status code and message', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const newBlog = {
      title: 'How to Implement a Basic JavaScript Application',
      author: 'Marcin Wosinek',
      url: 'https://how-to.dev/how-to-implement-a-basic-javascript-application',
      likes: 1,
    };

    const result = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(result.body.error).toContain('token missing or invalid');
  });

  test('deletion fails with proper status code and message', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    const result = await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);
    expect(result.body.error).toContain('token missing or invalid');
  });
});

describe('when user is logged in', () => {
  let token;
  beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const user = new User({
      username: 'root',
      name: 'root',
      passwordHash: await bcrypt.hash('root', 10),
    });
    const savedUser = await user.save();

    const blogs = helper.initialBlogs.map(
      (blog) =>
        new Blog({
          ...blog,
          user: savedUser._id,
        }),
    );
    helper.addBlogs(blogs);

    const credentials = { username: 'root', password: 'root' };
    const loginResult = await api.post('/api/login').send(credentials);
    token = loginResult.body.token;
  });

  test('a valid blog can be added', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const newBlog = {
      title: 'How to Implement a Basic JavaScript Application',
      author: 'Marcin Wosinek',
      url: 'https://how-to.dev/how-to-implement-a-basic-javascript-application',
      likes: 1,
    };

    await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    const blogTitles = blogsAtEnd.map((blog) => blog.title);

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length + 1);
    expect(blogTitles).toContain(
      'How to Implement a Basic JavaScript Application',
    );
  });

  test('the likes property for a new blog defaults to 0 if missing from request', async () => {
    const newBlog = {
      title: 'How to Implement a Basic JavaScript Application',
      author: 'Marcin Wosinek',
      url: 'https://how-to.dev/how-to-implement-a-basic-javascript-application',
    };

    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog);
    const savedBlog = response.body;
    expect(savedBlog.likes).toBe(0);
  });

  test('creation fails with proper status code and message if title or url is missing', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const newBlog = {
      author: 'test author',
    };

    const result = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/);

    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length);

    expect(result.body.error).toContain('missing title or url');
  });

  test('a blog created by the same user can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDB();
    const blogToDelete = blogsAtStart[0];

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`);
    const blogsAtEnd = await helper.blogsInDB();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const blogTitles = blogsAtEnd.map((blog) => blog.title);
    expect(blogTitles).not.toContain(blogToDelete.title);
  });
});

afterAll(() => mongoose.connection.close());

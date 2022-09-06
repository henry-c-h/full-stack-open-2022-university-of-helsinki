const blogsRouter = require('express').Router();
const { userExtractor } = require('../utils/middleware');
const Blog = require('../models/Blog');
const User = require('../models/User');

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogsRouter.post('/', userExtractor, async (request, response, next) => {
  try {
    const { body, user } = request;
    if (!user) {
      return response.status(401).json({
        error: 'token missing or invalid',
      });
    }

    const dbUser = await User.findById(user.id);
    const blog = new Blog({
      ...body,
      likes: body.likes || 0,
      user: dbUser._id,
    });
    if (!blog.title || !blog.url)
      return response.status(400).json({
        error: 'missing title or url',
      });
    const savedBlog = await blog.save();
    dbUser.blogs = [...dbUser.blogs, savedBlog._id];
    await dbUser.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.delete('/:id', userExtractor, async (request, response, next) => {
  try {
    const id = request.params.id;
    const user = request.user;
    if (!user) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    const blogToDelete = await Blog.findById(id);
    if (user.id !== blogToDelete.user.toString()) {
      return response.status(401).json({ error: 'token missing or invalid' });
    }

    await Blog.findByIdAndDelete(id);
    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

blogsRouter.put('/:id', async (request, response, next) => {
  try {
    const body = request.body;

    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
      new: true,
    });
    response.json(updatedBlog);
  } catch (exception) {
    next(exception);
  }
});

module.exports = blogsRouter;

const Blog = require('../models/Blog');
const User = require('../models/User');

const initialBlogs = [
  {
    title: 'How to create a React Button',
    author: 'Robin Wieruch',
    url: 'https://www.robinwieruch.de/react-button/',
    likes: 5,
  },
  {
    title: 'UI & UX Micro-Tips: Best of 2022',
    author: 'Marc Andrew',
    url: 'https://www.marcandrew.me/ui-ux-micro-tips-best-of-2022/?ref=jonas.io',
    likes: 10,
  },
];

const blogsInDB = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

const initialUser = {
  username: 'root',
  password: 'root',
  name: 'root',
};

const usersInDB = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

const addBlogs = async (blogs) => {
  const promiseArray = blogs.map((blog) => blog.save());
  await Promise.all(promiseArray);
};

module.exports = { initialBlogs, blogsInDB, initialUser, usersInDB, addBlogs };

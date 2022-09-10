const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const logger = require('./utils/logger');
const config = require('./utils/config');
const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');
const middleware = require('./utils/middleware');

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('mongoDB connected'));

app.use(cors());
app.use(express.json());
if (process.env.NODE_ENV !== 'test') {
  app.use(
    middleware.morgan(
      ':method :url :status :res[content-length] - :response-time ms :body',
    ),
  );
}
app.use(middleware.tokenExtractor);
app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing');
  app.use('/api/testing', testingRouter);
}

app.use(middleware.unknownPoint);
app.use(middleware.errorHandler);

module.exports = app;

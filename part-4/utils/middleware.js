const logger = require('./logger');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');

// configure logging
morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
});

const unknownPoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError')
    return response.status(400).send({ error: 'malformatted id' });
  if (error.name === 'ValidationError')
    return response.status(400).json({ error: error.message });
  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token',
    });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7);
  } else {
    request.token = null;
  }
  next();
};

const userExtractor = (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);
    if (!decodedToken.id) request.user = null;
    else request.user = decodedToken;
  }
  next();
};

module.exports = {
  morgan,
  unknownPoint,
  errorHandler,
  tokenExtractor,
  userExtractor,
};

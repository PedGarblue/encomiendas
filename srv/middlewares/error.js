const httpStatus = require('http-status');
const config = require('../config');
const AppError = require('../utils/AppError.js');

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
  };

  if(config.env === 'development'){
    response.stack = err.stack;
    console.log(err);
  }

  res.status(statusCode).format({
    json: () => {
      res.json(response);
    },
    default: () => {
      res.send(response);
    },
  });
};

module.exports = {
  errorConverter,
  errorHandler,
};
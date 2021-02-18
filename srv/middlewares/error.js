import httpStatus from 'http-status';
import AppError from '../utils/AppError';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof AppError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new AppError(statusCode, message, false, err.stack);
  }
  next(error);
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    stack: err.stack,
  };

  console.log(err);

  res.status(statusCode).format({
    json: () => {
      res.json(response);
    },
    default: () => {
      res.send(response);
    },
  });
};

import { ErrorRequestHandler } from 'express';
import { IGenericErrorMessage } from '../../interfaces/error';
import handleValidationError from '../../erros/handleValidationError';
import config from '../../config';
import ApiError from '../../erros/ApiError';
import { errorLogger } from '../../shared/loggers';
import { ZodError } from 'zod';
import handleZodError from '../../erros/handleZodError';

const globalErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
  // eslint-disable-next-line no-unused-expressions
  config.nodeEnv === 'development'
    ? // eslint-disable-next-line no-console
      console.log('Global Error handler', error)
    : errorLogger.error('GlobalErrorHandler', error);
  let statusCode = 500;
  let message = 'Something went wrong !';
  let errorMessages: IGenericErrorMessage[] = [];

  if (error?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  } else if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (error instanceof Error) {
    message = error?.message;
    errorMessages = error?.message
      ? [
          {
            path: '',
            message: error?.message,
          },
        ]
      : [];
  }

  res.status(statusCode).json({
    status: false,
    message,
    errorMessages,
    stack: config.nodeEnv !== 'production' ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;

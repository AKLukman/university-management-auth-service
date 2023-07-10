import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';
import { Routes } from './app/routes';
import httpStatus from 'http-status-codes';

const app: Application = express();

// cors
app.use(cors());

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Applications routes
app.use('/api/v1', Routes);
app.use('/api/v1', Routes);

// Global error handling
app.use(globalErrorHandler);

// Not found route
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API not found',
      },
    ],
  });
  next();
});

export default app;

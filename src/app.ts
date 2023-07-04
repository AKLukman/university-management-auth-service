import express, { Application } from 'express';
import cors from 'cors';
import { UserRoutes } from '../src/app/modules/users/users.route';
import globalErrorHandler from './app/middlewares/globalErrorHandlers';

const app: Application = express();

// cors
app.use(cors());

// parse
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Applications routes
app.use('/api/v1/users', UserRoutes.router);

// Global error handling
app.use(globalErrorHandler);

export default app;

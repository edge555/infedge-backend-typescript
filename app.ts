import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { Request, Response, NextFunction } from 'express';

import AppError from './utils/appError';
const globalErrorHandler = require('./utils/errorHandler');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const storyRouter = require('./routes/storyRoute');

dotenv.config();

const app = express();

const corsOptions: cors.CorsOptions = {
  origin: 'http://localhost:3001',
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/story', storyRouter);

const db = require('./database/dbconfig');
db();

app.get('/', (req: Request, res: Response, _next: NextFunction) => {
  res.writeHead(200);
  res.send('Hello world');
});

app.all('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

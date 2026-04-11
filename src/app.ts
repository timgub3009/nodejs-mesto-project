/**
 * @module app
 * @description Модуль, реализующий функционал бэкенда.
 * Запускает mongoose, routes, express.
 *
 */

import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { MONGODB_URL, PORT } from '../config';
import validate from './middlewares/validate';
import { signinSchema, signupSchema } from './validators';
import { createUser, login } from './controllers/users';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { errorHandler } from './errors/AppError';
import auth from './middlewares/auth';
import { requestsLogger, errorsLogger } from './middlewares/logger';

const app = express();

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.use(cookieParser());

app.use(requestsLogger);

app.use('/signin', validate(signinSchema), login);
app.use('/signup', validate(signupSchema), createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use(errorsLogger);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

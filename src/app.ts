/**
 * @module app
 * @description Модуль, реализующий функционал бэкенда.
 * Запускает mongoose, routes, express.
 *
 */

import express, { NextFunction, Response } from 'express';
import mongoose from 'mongoose';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { errorHandler } from './errors/AppErrors';

const app = express();
const PORT = 3000;
const MONGODB_URL = 'mongodb://localhost:27017/mestodb';
const HARDCODED_USER_ID = '69c973f1af1d6e5e1b0b8de7';

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.use((req: any, res: Response, next: NextFunction) => {
  req.user = {
    _id: HARDCODED_USER_ID,
  };

  next();
});

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

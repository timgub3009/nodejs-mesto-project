/**
 * @module app
 * @description Модуль, реализующий функционал бэкенда.
 * Запускает mongoose, routes, express.
 *
 */

import dotenv from 'dotenv';
import express, { NextFunction, Response, Request } from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { errorHandler } from './errors/AppError';

dotenv.config();

const app = express();

/** Порт сервера. */
const { PORT } = process.env;

/** URL подключения к MongoDB. */
const { MONGODB_URL } = process.env;

/** Временный ID пользователя для авторизации. */
const { HARDCODED_USER_ID } = process.env;

// Гарантируем, что сервер не запустится с неполной конфигурацией.
if (!PORT || !MONGODB_URL || !HARDCODED_USER_ID) {
  // eslint-disable-next-line no-console
  console.error('Отсутствуют необходимые переменные окружения');
  process.exit(1);
}

mongoose.connect(MONGODB_URL);

app.use(express.json());

// Временное решение.
app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: HARDCODED_USER_ID,
  };

  next();
});

app.use('/signin', login);
app.use('/signup', createUser);

app.use('/users', userRouter);
app.use('/cards', cardRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

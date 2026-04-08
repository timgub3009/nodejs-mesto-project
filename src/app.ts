/**
 * @module app
 * @description Модуль, реализующий функционал бэкенда.
 * Запускает mongoose, routes, express.
 *
 */

import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import { createUser, login } from './controllers/users';
import userRouter from './routes/users';
import cardRouter from './routes/cards';
import { errorHandler } from './errors/AppError';
import auth from './middlewares/auth';

dotenv.config();

const app = express();

/** Порт сервера. */
const { PORT } = process.env;

/** URL подключения к MongoDB. */
const { MONGODB_URL } = process.env;

// Гарантируем, что сервер не запустится с неполной конфигурацией.
if (!PORT || !MONGODB_URL) {
  // eslint-disable-next-line no-console
  console.error('Отсутствуют необходимые переменные окружения');
  process.exit(1);
}

mongoose.connect(MONGODB_URL);

app.use(express.json());

app.use('/signin', login);
app.use('/signup', createUser);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});

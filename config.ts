/**
 * @module config
 * @description Модуль, экспортирующий дефолтные значения env переменных для локальной разработки.
 */

import dotenv from 'dotenv';

dotenv.config();

export const {
  /** Порт сервера. */
  PORT = 3000,
  /** URL подключения к MongoDB. */
  MONGODB_URL = 'mongodb://localhost:27017/mestodb',
  /** Секрет для токена. */
  JWT_SECRET = 'default-secret',
} = process.env;

/**
 * @module errors/AppError
 * @description Модуль, экспортирующий класс для обработки ошибок и сам обработчик.
 *
 */

import {
  ErrorRequestHandler, Response, Request, NextFunction,
} from 'express';
import { ErrorMessages, HttpStatuses } from '../utils/constants';

/** Класс для обработки ошибок. */
export class AppError extends Error {
  /** Статус запроса. */
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);
  }
}

/**
 * Обработчик ошибок.
 * @param err объект ошибки.
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const errorHandler: ErrorRequestHandler = (
  err: AppError | Error,
  _req: Request,
  res: Response,
  // next необходим для корректного функционирования ErrorRequestHandler
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  if (err instanceof AppError) {
    const { statusCode = HttpStatuses.INTERNAL_SERVER_ERROR, message } = err;
    res.status(statusCode).json({
      message:
        statusCode === HttpStatuses.INTERNAL_SERVER_ERROR
          ? ErrorMessages.SERVER_ERROR
          : message,
    });
  } else {
    // eslint-disable-next-line no-console
    console.error('Необработанная ошибка:', err);
    res.status(HttpStatuses.INTERNAL_SERVER_ERROR).json({
      message: ErrorMessages.SERVER_ERROR,
    });
  }
};

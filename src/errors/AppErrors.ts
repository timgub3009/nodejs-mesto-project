/**
 * @module errors/AppErrors
 * @description Модуль, экспортирующий класс для обработки ошибок и сам обработчик.
 *
 */

import {
  ErrorRequestHandler, NextFunction, Request, Response,
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
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars
  next: NextFunction,
) => {
  const { statusCode = HttpStatuses.INTERNAL_SERVER_ERROR, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === HttpStatuses.INTERNAL_SERVER_ERROR
        ? ErrorMessages.SERVER_ERROR
        : message,
  });
};

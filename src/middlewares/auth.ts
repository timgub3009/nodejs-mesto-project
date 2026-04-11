/**
 * @module middlewares/auth
 * @description Middleware для проверки JWT токена.
 */

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from '../../config';
import { AppError } from '../errors/AppError';
import { ErrorMessages, HttpStatuses } from '../utils/constants';

interface PayloadWithJwt {
  _id: string;
}

/**
 * Middleware для проверки авторизации (через проверку JWT токена).
 * @param req объект запроса.
 * @param _res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
const auth = (req: Request, _res: Response, next: NextFunction): void => {
  const token = req.cookies.jwt;

  if (!token) {
    next(
      new AppError(
        ErrorMessages.AUTHORIZATION_NEEDED,
        HttpStatuses.UNAUTHORIZED,
      ),
    );
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET) as PayloadWithJwt;
    req.user = { _id: payload._id };
    next();
  } catch (error) {
    next(
      new AppError(
        ErrorMessages.AUTHORIZATION_NEEDED,
        HttpStatuses.UNAUTHORIZED,
      ),
    );
  }
};

export default auth;

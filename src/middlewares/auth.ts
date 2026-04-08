/**
 * @module middlewares/auth
 * @description Middleware для проверки JWT токена.
 */

import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ErrorMessages, HttpStatuses } from '../utils/constants';

interface PayloadWithJwt {
  _id: string;
}

const { JWT_SECRET = 'default-secret' } = process.env;

/**
 * Middleware для проверки авторизации (через проверку JWT токена).
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
const auth = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(
      new AppError(
        ErrorMessages.AUTHORIZATION_NEEDED,
        HttpStatuses.UNAUTHORIZED,
      ),
    );
    return;
  }

  const token = authorization.replace('Bearer ', '');

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

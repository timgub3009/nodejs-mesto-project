/**
 * @module middlewares/auth
 * @description Middleware для проверки JWT токена.
 */

import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ErrorMessages, HttpStatuses } from '../utils/constants';

const { JWT_SECRET = 'default-secret' } = process.env;

const auth = (req: Request, res: Response, next: NextFunction): void => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(
      new AppError(
        ErrorMessages.AUTHORIZATION_NEEDED,
        HttpStatuses.UNAUTHORIZED,
      ),
    );
  }

  const token = authorization.replace('Bearer ', '');

  try {
    const payload = jwt.verify(token, JWT_SECRET) as JwtPayload;
    req.user = { _id: payload._id };
    next();
  } catch (error) {
    return next(
      new AppError(
        ErrorMessages.AUTHORIZATION_NEEDED,
        HttpStatuses.UNAUTHORIZED,
      ),
    );
  }
};

export default auth;

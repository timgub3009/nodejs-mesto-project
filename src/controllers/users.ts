/**
 * @module controllers/users
 * @description Модуль, описывающий контроллер, ответственный за взаимодействие с моделью User.
 */
import mongoose from 'mongoose';
import { NextFunction, Request, Response } from 'express';
import { AppError } from '../errors/AppErrors';
import { ErrorMessages, HttpStatuses } from '../utils/constants';
import User, { IUser } from '../models/user';

/**
 * Метод, возвращающий всех пользователей.
 * `GET /users`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    next(error);
  }
};

/**
 * Метод, возвращающий пользователя по его идентификатору (id).
 * `GET /users/:userId`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};

/**
 * Метод создает нового пользователя.
 * `POST /users`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, about, avatar } = req.body as IUser;
    const newUser = await User.create({ name, about, avatar });
    res.status(HttpStatuses.CREATED).send(newUser);
  } catch (error) {
    if (
      error instanceof mongoose.Error.ValidationError
      || error instanceof mongoose.Error.CastError
    ) {
      next(new AppError(ErrorMessages.USER_CREATION_BAD_REQUEST, HttpStatuses.BAD_REQUEST));
    }
    next(error);
  }
};

/**
 * Метод, обновляющий информацию о пользователе.
 * `PATCH /users/me`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const updateProfile = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, about } = req.body as IUser;
    const userId = (req as any).user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        name,
        about,
      },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(user);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError
      || error instanceof mongoose.Error.ValidationError
    ) {
      next(new AppError(ErrorMessages.USER_PROFILE_UPD_BAD_REQUEST, HttpStatuses.BAD_REQUEST));
    }
    next(error);
  }
};

/**
 * Метод, обновляющий аватар пользователя.
 * `PATCH /users/me/avatar`
 * @param req- объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const updateAvatar = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { avatar } = req.body as IUser;
    const userId = (req as any).user._id;
    const user = await User.findByIdAndUpdate(
      userId,
      {
        avatar,
      },
      { new: true, runValidators: true },
    );
    if (!user) {
      throw new AppError(ErrorMessages.USER_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(user);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError
      || error instanceof mongoose.Error.ValidationError
    ) {
      next(new AppError(ErrorMessages.USER_AVATAR_UPD_BAD_REQUEST, HttpStatuses.BAD_REQUEST));
    }
    next(error);
  }
};

/**
 * @module controllers/users
 * @description Модуль, описывающий контроллер, ответственный за взаимодействие с моделью User.
 */

import { Request, Response } from 'express';
import User, { IUser } from '../models/user';

/**
 * Метод, возвращающий всех пользователей.
 * `GET /users`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка на сервере' });
  }
};

/**
 * Метод, возвращающий пользователя по его идентификатору (id).
 * `GET /users/:userId`
 * @param req запрос.
 * @param res возвращаемый ответ.
 * @returns данные найденного пользователя.
 */
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id);
    if (!user) {
      res.status(404).send({ message: 'Пользователь не найден' });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({
      message: 'Ошибка на сервере',
    });
  }
};

/**
 * Метод создает нового пользователя.
 * `POST /users`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, about, avatar } = req.body as IUser;
    const newUser = await User.create({ name, about, avatar });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({
      message: 'Ошибка на сервере',
    });
  }
};

/**
 * Метод, обновляющий информацию о пользователе.
 * `PATCH /users/me`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const updateProfile = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, about } = req.body as IUser;
    const userId = (req as any).user._id;
    const user = await User.findByIdAndUpdate(userId, {
      name,
      about,
    });
    if (!user) {
      res.status(404).send({ message: 'Пользователя не существует' });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

/**
 * Метод, обновляющий аватар пользователя.
 * `PATCH /users/me/avatar`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const updateAvatar = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { avatar } = req.body as IUser;
    const userId = (req as any).user._id;
    const user = await User.findByIdAndUpdate(userId, {
      avatar,
    });
    if (!user) {
      res.status(404).send({ message: 'Пользователя не существует' });
      return;
    }
    res.send(user);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

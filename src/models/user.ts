/**
 * @module models/User
 * @description Модуль, описывающий схему и экспортирующий Mongoose-модель
 *              для работы с пользователями в MongoDB.
 */

import { Schema, model } from 'mongoose';
import validator from 'validator';
import { URL_REGEX } from '../validators';
import { ErrorMessages } from '../utils/constants';

/** Интерфейс пользователя. */
export interface IUser {
  /** Имя пользователя, от 2 до 30 символов. */
  name: string;
  /** Информация о пользователе, от 2 до 200 символов. */
  about: string;
  /** URL-ссылка на аватар (изображение). */
  avatar: string;
  /** Электронная почта. */
  email: string;
  /** Пароль. */
  password: string;
}

/** Схема пользователя для MongoDB. */
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (v: string) => URL_REGEX.test(v),
    },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: ErrorMessages.EMAIL_INVALID,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

/** Модель User для взаимодействия с коллекцией "users". */
const User = model<IUser>('user', userSchema);

export default User;

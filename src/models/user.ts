/**
 * @module models/User
 * @description Модуль, описывающий схему и экспортирующий Mongoose-модель
 *              для работы с пользователями в MongoDB.
 */

import { Schema, model } from 'mongoose';

/** Интерфейс пользователя. */
export interface IUser {
  /** Имя пользователя, от 2 до 30 символов. */
  name: string;
  /** Информация о пользователе, от 2 до 200 символов. */
  about: string;
  /** URL-ссылка на аватар (изображение). */
  avatar: string;
}

/** Схема пользователя для MongoDB. */
const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: 'Жак Ив Кусто',
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: true,
    default:
      'https://upload.wikimedia.org/wikipedia/commons/1/10/Cousteau1972_%28cropped%29.jpg',
  },
});

/** Модель User для взаимодействия с коллекцией "users". */
const User = model<IUser>('user', userSchema);

export default User;

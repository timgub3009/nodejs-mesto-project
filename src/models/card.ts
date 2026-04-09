/**
 * @module models/Card
 * @description Модуль, описывающий схему и экспортирующий Mongoose-модель
 *              для работы с карточками в MongoDB.
 */

import { Schema, Types, model } from 'mongoose';
import { URL_REGEX } from '../validators';

/** Интерфейс карточки. */
export interface ICard {
  /** Имя карточки от 2 до 30 символов. */
  name: string;
  /** Ссылка на картинку. */
  link: string;
  /** Ссылка на модель автора карточки. */
  owner: Types.ObjectId;
  /** Список лайкнувших пост пользователей. */
  likes: Types.ObjectId[];
  /** Дата создания. */
  createdAt: Date;
}

/** Схема карточки для MongoDB. */
const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => URL_REGEX.test(v),
    },
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

/** Модель Card для взаимодействия с коллекцией "cards". */
const Card = model<ICard>('card', cardSchema);

export default Card;

/**
 * @module controllers/cards
 * @description Модуль, описывающий контроллер, ответственный за взаимодействие с моделью Card.
 */

import { Request, Response } from 'express';
import Card, { ICard } from '../models/card';

/**
 * Метод возвращает все карточки.
 * `GET /cards`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

/**
 * Метод создает карточку.
 * `POST /cards`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const createCard = async (req: Request, res: Response) => {
  try {
    const { name, link } = req.body as ICard;
    const owner = (req as any).user._id;
    const newCard = Card.create({
      name,
      link,
      owner,
    });
    res.status(201).send(newCard);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

/**
 * Метод удаляет карточку по ее идентификатору.
 * `DELETE /cards/:cardId`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const deleteCard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
      return;
    }
    res.send({ message: 'Карточка удалена' });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

/**
 * Метод добавляет лайк карточке.
 * `PUT /cards/:cardId/likes`
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const likeCard = async (req: Request, res: Response): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: (req as any).user._id } }, // добавить _id в массив, если его там нет
      { new: true },
    );
    if (!card) {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
    res.send(card);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

/**
 * Метод убирает лайк у карточки.
 * `DELETE /cards/:cardId/likes `
 * @param req запрос.
 * @param res возвращаемый ответ.
 */
export const dislikeCard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: (req as any).user._id } },
      { new: true },
    );
    res.send(card);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

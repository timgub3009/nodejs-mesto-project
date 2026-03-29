/**
 * @module controllers/cards
 * @description Модуль, описывающий контроллер, ответственный за взаимодействие с моделью Card.
 */

import { Request, Response } from 'express';
import Card, { ICard } from '../models/card';

export const getAllCards = async (req: Request, res: Response) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

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

export const deleteCard = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      res
        .status(404)
        .send({ message: 'Карточка с указанным идентификатором не найдена' });
      return;
    }
    res.send({ message: 'Карточка удалена' });
  } catch (error) {
    res.status(500).send({ message: 'Ошибка' });
  }
};

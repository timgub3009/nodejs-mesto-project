/**
 * @module controllers/cards
 * @description Модуль, описывающий контроллер, ответственный за взаимодействие с моделью Card.
 */

import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import { AppError } from '../errors/AppError';
import { ErrorMessages, HttpStatuses } from '../utils/constants';
import Card, { ICard } from '../models/card';

/**
 * Метод возвращает все карточки.
 * `GET /cards`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const getAllCards = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({});
    res.send(cards);
  } catch (error) {
    next(error);
  }
};

/**
 * Метод создает карточку.
 * `POST /cards`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const createCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { name, link } = req.body as ICard;
    const owner = (req as any).user._id;
    const newCard = await Card.create({
      name,
      link,
      owner,
    });
    res.status(HttpStatuses.CREATED).send(newCard);
  } catch (error) {
    if (
      error instanceof mongoose.Error.CastError
      || error instanceof mongoose.Error.ValidationError
    ) {
      next(
        new AppError(
          ErrorMessages.CARD_CREATION_BAD_REQUEST,
          HttpStatuses.BAD_REQUEST,
        ),
      );
      return;
    }
    next(error);
  }
};

/**
 * Метод удаляет карточку по ее идентификатору.
 * `DELETE /cards/:cardId`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const deleteCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { cardId } = req.params;
    const card = await Card.findByIdAndDelete(cardId);
    if (!card) {
      throw new AppError(ErrorMessages.CARD_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(card);
  } catch (error) {
    next(error);
  }
};

/**
 * Метод добавляет лайк карточке.
 * `PUT /cards/:cardId/likes`
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const likeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: (req as any).user._id } },
      { new: true },
    );
    if (!card) {
      throw new AppError(ErrorMessages.CARD_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(
        new AppError(
          ErrorMessages.CARD_LIKE_BAD_REQUEST,
          HttpStatuses.BAD_REQUEST,
        ),
      );
      return;
    }
    next(error);
  }
};

/**
 * Метод убирает лайк у карточки.
 * `DELETE /cards/:cardId/likes `
 * @param req объект запроса.
 * @param res объект ответа.
 * @param next колбэк для передачи управления следующему обработчику или передачи ошибки.
 */
export const dislikeCard = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const card = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: (req as any).user._id } },
      { new: true },
    );
    if (!card) {
      throw new AppError(ErrorMessages.CARD_NOT_FOUND, HttpStatuses.NOT_FOUND);
    }
    res.send(card);
  } catch (error) {
    if (error instanceof mongoose.Error.CastError) {
      next(
        new AppError(
          ErrorMessages.CARD_DISLIKE_BAD_REQUEST,
          HttpStatuses.BAD_REQUEST,
        ),
      );
      return;
    }
    next(error);
  }
};

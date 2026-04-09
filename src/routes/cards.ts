/**
 * @module routes/cards
 * @description Модуль, экспортирующий роутер и маршруты для карточек.
 *
 */

import { Router } from 'express';

import {
  createCard,
  deleteCard,
  dislikeCard,
  getAllCards,
  likeCard,
} from '../controllers/cards';
import validate from '../middlewares/validate';
import createCardSchema from '../validators/card';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', validate(createCardSchema), createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;

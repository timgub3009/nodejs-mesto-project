import { Router } from 'express';

import {
  createCard,
  deleteCard,
  dislikeCard,
  getAllCards,
  likeCard,
} from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', dislikeCard);

export default cardRouter;

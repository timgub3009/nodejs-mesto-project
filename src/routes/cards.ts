import { Router } from 'express';

import { createCard, deleteCard, getAllCards } from '../controllers/cards';

const cardRouter = Router();

cardRouter.get('/', getAllCards);
cardRouter.post('/', createCard);
cardRouter.delete('/:cardId', deleteCard);

export default cardRouter;

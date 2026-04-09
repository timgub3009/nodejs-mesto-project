/**
 * @module validators/card
 * @description Схемы валидации для операций с карточками.
 */

import { z } from 'zod';
import { cardNameSchema, urlSchema } from './common';

/** Схема валидации для контроллера создания карточки. */
const createCardSchema = z.object({
  body: z.object({
    name: cardNameSchema,
    link: urlSchema,
  }),
});

export default createCardSchema;

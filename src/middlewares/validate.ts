/**
 * @module middlewares/validate
 * @description Middleware для валидации запросов.
 */

import { type ZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line max-len
const validate = (schema: ZodObject) => async (req: Request, _res: Response, next: NextFunction) => {
  try {
    schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    next(error);
  }
};

export default validate;

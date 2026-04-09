/**
 * @module validators/user
 * @description Схемы валидации для операций с пользователями.
 */

import { z } from 'zod';
import {
  urlSchema,
  emailSchema,
  passwordSchema,
  userAboutSchema,
  userNameSchema,
} from './common';

/** Схема проверки валидации регистрации пользователя. */
export const signupSchema = z.object({
  body: z.object({
    name: userNameSchema.optional(),
    about: userAboutSchema.optional(),
    avatar: urlSchema.optional(),
    email: emailSchema,
    password: passwordSchema,
  }),
});

/** Схема проверки валидации авторизации пользователя. */
export const signinSchema = z.object({
  body: z.object({
    email: emailSchema,
    password: passwordSchema,
  }),
});

/** Схема проверки валидации обновления профиля. */
export const updateProfileSchema = z.object({
  body: z.object({
    name: userNameSchema,
    about: userAboutSchema,
  }),
});

/** Схема проверки валидации обновления аватара профиля. */
export const updateAvatarSchema = z.object({
  body: z.object({
    avatar: urlSchema,
  }),
});

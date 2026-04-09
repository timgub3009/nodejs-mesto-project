/**
 * @module validators/common
 * @description Общие схемы валидации, используемые в разных модулях.
 */

import { z } from 'zod';

/** Регулярное выражение для проверки URL. */
export const URL_REGEX = /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[a-zA-Z0-9\-._~:/?#[\]@!$&'()*+,;=]*#?)?$/;

/** Схема проверки валидации для имени пользователя. */
export const userNameSchema = z.string().min(2).max(30);
/** Схема проверки валидации для описания пользователя. */
export const userAboutSchema = z.string().min(2).max(200);
/** Схема проверки валидации для наименования карточки.  */
export const cardNameSchema = z.string().min(2).max(30);
/** Схема проверки валидации для почтового адреса. */
export const emailSchema = z.email();
/** Схема проверки валидации для пароля. */
export const passwordSchema = z.string().min(1);
/** Схема проверки валидации для ссылки. */
export const urlSchema = z.string().trim().regex(URL_REGEX);

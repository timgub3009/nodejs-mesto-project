/**
 * @module utils/constants
 * @description Модуль, экспортирующий константы.
 *
 */

/** Текстовые описания ошибок. */
export const ErrorMessages = {
  USER_CREATION_BAD_REQUEST:
    'Переданы некорректные данные при создании пользователя',
  USER_PROFILE_UPD_BAD_REQUEST:
    'Переданы некорректные данные при обновлении профиля',
  USER_AVATAR_UPD_BAD_REQUEST:
    'Переданы некорректные данные при обновлении аватара',
  USER_NOT_FOUND: 'Пользователь по указанному _id не найден',
  CARD_CREATION_BAD_REQUEST:
    'Переданы некорректные данные при создании карточки',
  CARD_LIKE_BAD_REQUEST: 'Переданы некорректные данные для постановки лайка',
  CARD_DISLIKE_BAD_REQUEST: 'Переданы некорректные данные для снятия лайка',
  CARD_NOT_FOUND: 'Карточка с указанным _id не найдена',
  SERVER_ERROR: 'На сервере произошла ошибка',
} as const;

/** Статусы HTTP-запросов. */
export const HttpStatuses = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

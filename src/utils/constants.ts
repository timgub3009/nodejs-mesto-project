/**
 * @module utils/constants
 * @description Модуль, экспортирующий константы.
 *
 */

/** Текстовые описания ошибок. */
export const ErrorMessages = {
  USER_CREATION_BAD_REQUEST:
    "Переданы некорректные данные при создании пользователя",
  USER_PROFILE_UPD_BAD_REQUEST:
    "Переданы некорректные данные при обновлении профиля",
  USER_AVATAR_UPD_BAD_REQUEST:
    "Переданы некорректные данные при обновлении аватара",
  USER_NOT_FOUND: "Пользователь по указанному _id не найден",
  CARD_CREATION_BAD_REQUEST:
    "Переданы некорректные данные при создании карточки",
  CARD_LIKE_BAD_REQUEST: "Переданы некорректные данные для постановки лайка",
  CARD_DISLIKE_BAD_REQUEST: "Переданы некорректные данные для снятия лайка",
  CARD_NOT_FOUND: "Карточка с указанным _id не найдена",
  SERVER_ERROR: "На сервере произошла ошибка",
  EMAIL_INVALID: "Некорректный формат email",
  EMAIL_EXISTS: "Пользователь с таким email уже зарегистрирован",
  AUTHORIZATION_FAILED: "Неправильный пароль или email",
} as const;

/** Статусы HTTP-запросов. */
export const HttpStatuses = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

/** Кол-во итераций хэширования ("соли") пароля. */
export const SALT_ROUNDS = 10;

/** Время жизни куки (7 дней в ms). */
export const COOKIE_LIFE_SPAN = 604800000;

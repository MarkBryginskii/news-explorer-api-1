const validationErrors = {
  email: {
    REQUIRED: "Поле 'E-mail' обязательно",
    LONG: 'Email не должен превышать 40 символов',
    INVALID: 'Недопустимый E-mail',
  },
  password: {
    REQUIRED: "Поле 'Пароль' обязательно",
  },
  name: {
    SHORT: 'В имени должно быть как минимум 2 символа',
    LONG: 'Имя не должно превышать 30 символов',
  },
  url: {
    INVALID: 'Недопустимый URL',
  },
  id: {
    INVALID: 'Невалидный ID',
  },
  date: {
    INVALID: 'Неверный формат даты',
  },
  requiredField: (name) => `Поле '${name}' обязательно`,
  emptyField: (name) => `Поле '${name}' не может быть пустым`,
};

const requestErrors = {
  notFound: {
    ERROR_NAME: 'DocumentNotFoundError',
    USER_MESSAGE: 'Пользователь не найден',
    URL_MESSAGE: 'Запрашиваемый ресурс не найден',
    CARD_MESSAGE: 'Статья не найдена',
  },
  validation: {
    ERROR_NAME: 'ValidationError',
  },
  conflict: {
    MONGO_ERROR_CODE: 11000,
    MESSAGE: 'Пользователь с данным e-mail уже зарегистрирован',
  },
  forbidden: {
    CARD_MESSAGE: 'Нельзя удалять чужие статьи',
  },
  invalid: {
    USER_MESSAGE: 'Невалидный id пользователя',
    CARD_MESSAGE: 'Невалидный id статьи',
  },
  serverError: {
    MESSAGE: 'Внутренняя ошибка сервера',
  },
};

const authErrors = {
  unauthorized: {
    LOGIN_MESSAGE: 'Неправильные e-mail или пароль',
    NOTOKEN_MESSAGE: 'Необходима авторизация',
  },
};

module.exports = { validationErrors, requestErrors, authErrors };

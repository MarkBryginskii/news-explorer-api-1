exports.validationErrors = {
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
};

exports.requestErrors = {
  notFound: {
    ERROR_NAME: 'DocumentNotFoundError',
    USER_MESSAGE: 'Пользователь не найден',
    URL_MESSAGE: 'Запрашиваемый ресурс не найден',
  },
  validation: {
    ERROR_NAME: 'ValidationError',
  },
  conflict: {
    MONGO_ERROR_CODE: 11000,
    MESSAGE: 'Пользователь с данным e-mail уже зарегистрирован',
  },
  forbidden: {
    CARD_MESSAGE: 'Нельзя удалять чужие карточки',
  },
  serverError: {
    MESSAGE: 'Внутренняя ошибка сервера',
  },
};

exports.authErrors = {
  unauthorized: {
    LOGIN_MESSAGE: 'Неправильные e-mail или пароль',
    NOTOKEN_MESSAGE: 'Необходима авторизация',
  },
};

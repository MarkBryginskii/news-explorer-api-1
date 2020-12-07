require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
// const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/not-found');
const { requestErrors } = require('./constants/error-messages');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://127.0.0.1:27017/news-explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

// app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(requestLogger);

app.all('/*', () => {
  throw new NotFoundError(requestErrors.notFound.URL_MESSAGE);
});

// app.use(errorLogger);
app.use(errors());

app.use((err, _req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? requestErrors.serverError.MESSAGE : message,
  });
  next(err);
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту: ${PORT}`);
});

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
// const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const { requestErrors } = require('./constants/error-messages');
// const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');

const app = express();
const { PORT = 3000, MONGO_URL } = process.env;
const { MONGO_DEV_URL } = require('./config');

mongoose.connect(MONGO_URL || MONGO_DEV_URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(requestLogger);

app.use((req, _res, next) => {
  req.user = {
    _id: '5fcfa51945ed2f795dd4d28c',
  };
  next();
});

app.use(routes);

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

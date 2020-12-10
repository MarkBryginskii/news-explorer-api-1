const router = require('express').Router();
const NotFoundError = require('../errors/not-found');
const { requestErrors } = require('../constants/error-messages');
// const { celebrate, Joi } = require('celebrate');

const articleRouter = require('./articles');
const userRouter = require('./users');

router.use('/articles', articleRouter);
router.use('/users', userRouter);

router.all('*', () => {
  throw new NotFoundError(requestErrors.notFound.URL_MESSAGE);
});

module.exports = router;

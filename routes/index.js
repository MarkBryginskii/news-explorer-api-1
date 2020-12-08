const router = require('express').Router();
// const { celebrate, Joi } = require('celebrate');

const articleRouter = require('./articles');
const userRouter = require('./users');

router.use('/articles', articleRouter);
router.use('/users', userRouter);

module.exports = router;

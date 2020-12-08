const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles');

router.get('/', getArticles);
router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().trim().required(),
    title: Joi.string().trim().required(),
    text: Joi.string().trim().required(),
    date: Joi.date().required(),
    source: Joi.string().trim().required(),
    link: Joi.string().trim().uri().required(),
    image: Joi.string().trim().uri().required(),
  }),
}), createArticle);
router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24),
  }),
}), deleteArticle);

module.exports = router;

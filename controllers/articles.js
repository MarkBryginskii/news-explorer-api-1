const Article = require('../models/article');
const BadRequestError = require('../errors/bad-request');
const ForbiddenError = require('../errors/forbidden');
const NotFoundError = require('../errors/not-found');
const { requestErrors } = require('../constants/error-messages');

const getArticles = (_req, res, next) => {
  Article.find({})
    .sort({ createdAt: -1 })
    .then((articles) => res.send(articles))
    .catch(next);
};

const createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  const owner = req.user._id;

  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner,
  })
    .then((article) => res.send(article))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(requestErrors.notFound.CARD_MESSAGE);
      }
      /** @description Запретить удалять чужие статьи */
      if (article.owner.toString() !== req.user._id.toString()) {
        throw new ForbiddenError(requestErrors.forbidden.CARD_MESSAGE);
      }
      Article.findByIdAndRemove(req.params.articleId)
        .then((deletedArticle) => res.send(deletedArticle));
    })
    .catch(next);
};

module.exports = { getArticles, createArticle, deleteArticle };

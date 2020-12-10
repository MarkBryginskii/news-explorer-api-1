const { celebrate, Joi } = require('celebrate');
const { urlValidator } = require('../utils/validator');
const { validationErrors } = require('../constants/error-messages');

const validatePost = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().trim().required()
      .messages({
        'any.required': validationErrors.requiredField('keyword'),
        'string.empty': validationErrors.emptyField('keyword'),
      }),
    title: Joi.string().trim().required()
      .messages({
        'any.required': validationErrors.requiredField('title'),
        'string.empty': validationErrors.emptyField('title'),
      }),
    text: Joi.string().trim().required()
      .messages({
        'any.required': validationErrors.requiredField('text'),
        'string.empty': validationErrors.emptyField('text'),
      }),
    date: Joi.date().required()
      .messages({
        'any.required': validationErrors.requiredField('date'),
        'date.base': validationErrors.date.INVALID,
      }),
    source: Joi.string().trim().required()
      .messages({
        'any.required': validationErrors.requiredField('source'),
        'string.empty': validationErrors.emptyField('source'),
      }),
    link: Joi.string().trim().required()
      .custom((value, helpers) => {
        if (urlValidator(value)) {
          return value;
        }
        return helpers.message(validationErrors.url.INVALID);
      })
      .messages({
        'any.required': validationErrors.requiredField('link'),
        'string.empty': validationErrors.emptyField('link'),
      }),
    image: Joi.string().trim().required()
      .custom((value, helpers) => {
        if (urlValidator(value)) {
          return value;
        }
        return helpers.message(validationErrors.url.INVALID);
      })
      .messages({
        'any.required': validationErrors.requiredField('image'),
        'string.empty': validationErrors.emptyField('image'),
      }),
  }),
});

const validateObjectId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().length(24)
      .messages({
        'string.alphanum': validationErrors.id.INVALID,
        'string.length': validationErrors.id.INVALID,
      }),
  }),
});

module.exports = { validatePost, validateObjectId };

const mongoose = require('mongoose');
const { urlValidator } = require('../utils/validator');
const { validationErrors } = require('../constants/error-messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: [true, validationErrors.requiredField('keyword')],
  },
  title: {
    type: String,
    required: [true, validationErrors.requiredField('title')],
  },
  text: {
    type: String,
    required: [true, validationErrors.requiredField('text')],
  },
  date: {
    type: String,
    required: [true, validationErrors.requiredField('date')],
  },
  source: {
    type: String,
    required: [true, validationErrors.requiredField('source')],
  },
  link: {
    type: String,
    required: [true, validationErrors.requiredField('link')],
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
  image: {
    type: String,
    required: [true, validationErrors.requiredField('image')],
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, validationErrors.requiredField('owner')],
  },
});

/**
 * @method toJSON
 * @description удалить _id из объекта ответа
 */
articleSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.owner;
  return obj;
};

module.exports = mongoose.model('article', articleSchema);

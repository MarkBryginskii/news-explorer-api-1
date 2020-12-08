const mongoose = require('mongoose');
const { urlValidator } = require('../utils/validator');
const { validationErrors } = require('../constants/error-messages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: urlValidator,
      message: validationErrors.url.INVALID,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
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

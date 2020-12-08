const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorized');
const { emailValidator } = require('../utils/validator');
const { validationErrors, authErrors } = require('../constants/error-messages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationErrors.email.REQUIRED],
    maxlength: [40, validationErrors.email.LONG],
    unique: true,
    validate: {
      validator: emailValidator,
      message: validationErrors.email.INVALID,
    },
  },
  password: {
    type: String,
    required: [true, validationErrors.password.REQUIRED],
  },
  name: {
    type: String,
    minlength: [2, validationErrors.name.SHORT],
    maxlength: [30, validationErrors.name.LONG],
  },
});

/**
 * @static @method findUser
 * @description валидировать пользователя по базе
 * @param {string} email
 * @param {string} password
 */
userSchema.statics.findUser = async function findUser(email, password) {
  const user = await this.findOne({ email });
  if (!user) throw new UnauthorizedError(authErrors.unauthorized.LOGIN_MESSAGE);
  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new UnauthorizedError(authErrors.unauthorized.LOGIN_MESSAGE);
  return user;
};

/**
 * @method toJSON
 * @description удалить пароль из объекта ответа
 */
userSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('user', userSchema);

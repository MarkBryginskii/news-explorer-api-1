const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found');
const ConflictError = require('../errors/conflict');
const BadRequestError = require('../errors/bad-request');
const { requestErrors } = require('../constants/error-messages');

const { NODE_ENV, JWT_SECRET } = process.env;
const { JWT_DEV_SECRET } = require('../config');

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        const error = new BadRequestError(requestErrors.invalid.USER_MESSAGE);
        next(error);
      }
      next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === requestErrors.validation.ERROR_NAME) {
        const error = new BadRequestError(err.message.replace(/^.+: /g, ''));
        next(error);
      }
      /** @description ошибка MongoDB, дублирующаяся запись */
      if (err.code === requestErrors.conflict.MONGO_ERROR_CODE) {
        const error = new ConflictError(requestErrors.conflict.MESSAGE);
        next(error);
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUser(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 604800000,
          httpOnly: true,
          sameSite: true,
        })
        .send(user);
    })
    .catch(next);
};

const logout = async (_req, res, next) => {
  try {
    res
      .cookie('jwt', '', {
        maxAge: -1,
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: 'Logged out' });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getMe,
  createUser,
  login,
  logout,
};

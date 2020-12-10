const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const BadRequestError = require('../errors/bad-request');
const { requestErrors } = require('../constants/error-messages');

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

module.exports = { getMe };

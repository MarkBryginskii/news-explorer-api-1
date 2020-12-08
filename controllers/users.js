const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const { requestErrors } = require('../constants/error-messages');

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(requestErrors.notFound.USER_MESSAGE);
      }
      res.send(user);
    })
    .catch(next);
};

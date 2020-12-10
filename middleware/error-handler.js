const { requestErrors } = require('../constants/error-messages');

const errorHandler = (err, _req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? requestErrors.serverError.MESSAGE : message,
  });
  next(err);
};

module.exports = { errorHandler };

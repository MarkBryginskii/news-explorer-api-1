const isEmail = require('validator/lib/isEmail');
const isUrl = require('validator/lib/isURL');

module.exports.urlValidator = (v) => isUrl(v, { protocols: ['http', 'https'], require_protocol: true });

module.exports.emailValidator = (v) => isEmail(v);

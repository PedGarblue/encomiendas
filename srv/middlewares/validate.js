const Joi = require('joi');
const obj = require('../utils/object.util.js');
const AppError = require('../utils/AppError.js');

module.exports = schema => (req, res, next) => {
  const validSchema = obj.pick(schema, ['params', 'query', 'body']);
  const object = obj.pick(req, Object.keys(validSchema));
  const { value, error } = Joi.compile(validSchema)
    .prefs({ errors: { label: 'key' } })
    .validate(object);

  if (error) {
    const errorMessage = error.details.map(details => details.message).join(', ');
    return next(new AppError(400, errorMessage));
  }
  Object.assign(req, value);
  return next();
};

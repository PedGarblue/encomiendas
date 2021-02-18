import Joi from 'joi';
import { pick } from '../utils/object.util';
import AppError from '../utils/AppError';

export default schema => (req, res, next) => {
  const validSchema = pick(schema, ['params', 'query', 'body']);
  const object = pick(req, Object.keys(validSchema));
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

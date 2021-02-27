const Joi = require('joi');

const updateHour = {
  body: Joi.object().keys({
    action: Joi
      .string()
      .valid('ADD', 'APPEND')
      .required(),
    hourId: Joi
      .string()
      .required(),
    itemId: Joi
      .number()
  }),
};

module.exports = {
  updateHour,
}
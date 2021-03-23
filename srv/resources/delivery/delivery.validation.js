const Joi = require('joi');
const { objectId } = require('../../utils/custom.validation');

const createDelivery = {
  body: Joi.object().keys({
    products: Joi
      .array()
      .items(
        Joi.string().valid('cookies', 'apples', 'fororo')
      )
      .required()
      .messages({
        'any.only': "Product list doesn't includes valid products",
      }),
    hour: Joi
      .string()
      .regex(/^[0-2]?[0-9]:[0-5][0-9](AM|PM)$/)
      .required()
      .messages({
        'string.pattern.base': '"hour" should be a valid hour pattern',
      }),
  }),
};

const getDeliveriesByUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId).required(),
  }),
};

module.exports = {
  createDelivery,
  getDeliveriesByUser,
};
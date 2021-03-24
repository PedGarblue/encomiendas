const Joi = require('joi');

const createBike = {
  body: Joi.object().keys({
    plate: Joi.string().required(),
  }),
};

const getBikes = {
  params: Joi.object().keys({}),
};

module.exports = {
  createBike,
  getBikes,
};
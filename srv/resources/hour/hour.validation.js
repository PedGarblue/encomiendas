const Joi = require('joi');

const getHours = {
  params: Joi.object().keys({}),
}

module.exports = {
  getHours,
};
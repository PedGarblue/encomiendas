const Joi = require('joi');
const { objectId } = require('../../utils/custom.validation');

const getUser = { 
  params: Joi.object().keys({
    userId: Joi.string()
    .required()
    .custom(objectId),
  }),
};


module.exports = {
  getUser,
}
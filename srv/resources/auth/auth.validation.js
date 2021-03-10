const Joi = require('joi');
const { password } = require('../../utils/custom.validation');

const register = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string()
      .required()
      .custom(password),
  }),
};

const login = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  refreshTokens,
};
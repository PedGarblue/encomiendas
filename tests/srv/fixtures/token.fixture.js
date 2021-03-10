const moment = require('moment');
const config = require('@/srv/config');
const tokenService = require('@/srv/resources/token/token.service');
const { userOne, admin } = require('./user.fixture');

const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
const userOneAccessToken = tokenService.generateToken(userOne._id, accessTokenExpires);
const adminAccessToken = tokenService.generateToken(admin._id, accessTokenExpires);

module.exports = {
  userOneAccessToken,
  adminAccessToken,
};
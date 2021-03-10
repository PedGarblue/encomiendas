const moment = require('moment');
const bcrypt = require('bcrypt');
const httpStatus = require('http-status');
const config = require('../../config');
const tokenService = require('../token/token.service');
const userService = require('../user/user.service');
const AppError = require('../../utils/AppError');

const generateAuthTokens = async userId => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = tokenService.generateToken(userId, accessTokenExpires);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = tokenService.generateToken(userId, refreshTokenExpires);
  await tokenService.saveToken(refreshToken, userId, refreshTokenExpires, 'refresh');

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

const checkPassword = async (password, correctPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (!isPasswordMatch) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Passwords do not match');
  }
};

const loginUser = async (name, password) => {
  try {
    const user = await userService.getUserByName(name);
    await checkPassword(password, user.password);
    return user;
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect name or password');
  }
};

const refreshAuthTokens = async refreshToken => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, 'refresh');
    const userId = refreshTokenDoc.user;
    await userService.getUserById(userId);
    await refreshTokenDoc.remove();
    return await generateAuthTokens(userId);
  } catch (error) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

module.exports = {
  generateAuthTokens,
  loginUser,
  refreshAuthTokens,
};
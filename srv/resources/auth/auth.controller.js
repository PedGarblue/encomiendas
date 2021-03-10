const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const authService = require('./auth.service');
const userService = require('../user/user.service');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.status(httpStatus.CREATED).send(response);
});

const login = catchAsync(async (req, res) => {
  const user = await authService.loginUser(req.body.name, req.body.password);
  const tokens = await authService.generateAuthTokens(user.id);
  const response = { user: user.transform(), tokens };
  res.send(response);
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuthTokens(req.body.refreshToken);
  const response = { ...tokens };
  res.send(response);
});

module.exports = {
  register,
  login,
  refreshTokens,
};
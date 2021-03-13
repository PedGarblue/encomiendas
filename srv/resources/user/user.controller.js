const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const userService = require('./user.service');

const getUser = catchAsync(async (req, res, next) => {
  const user = await userService.getUserById(req.params.userId);
  res.status(httpStatus.OK).send(user.transform());
});

module.exports = {
  getUser,
};
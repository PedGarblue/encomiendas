const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const hourService = require('./hour.service');

const getHours = catchAsync(async (req, res) => {
  const hours = await hourService.getHours();
  res.status(httpStatus.OK).send(hours);
});

module.exports = {
  getHours,
};
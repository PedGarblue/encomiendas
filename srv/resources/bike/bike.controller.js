const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const bikeService = require('./bike.service');

const createBike = catchAsync(async (req, res) => {
  const bike = await bikeService.createBike(req.body);
  res.status(httpStatus.CREATED).send(bike.transform());
});

const getBikes = catchAsync(async (req, res) => {
  const bikes = await bikeService.getBikes();
  res.status(httpStatus.OK).send(bikes.map(bike => bike.transform()));
});

module.exports = {
  createBike,
  getBikes,
};
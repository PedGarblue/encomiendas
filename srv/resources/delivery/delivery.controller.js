const httpStatus = require('http-status');
const { pick } = require('../../utils/object.util');
const catchAsync = require('../../utils/catchAsync');
const deliveryService = require('./delivery.service');

const createDelivery = catchAsync(async (req, res) => {
  const data = pick(req.body, ['products', 'hour']);
  const delivery = await deliveryService.createDelivery(data, req.user);
  res.status(httpStatus.CREATED).send(delivery);
});

module.exports = {
  createDelivery,
};
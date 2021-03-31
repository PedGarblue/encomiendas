const httpStatus = require('http-status');
const { pick } = require('../../utils/object.util');
const catchAsync = require('../../utils/catchAsync');
const deliveryService = require('./delivery.service');
const AppError = require('../../utils/AppError');

const createDelivery = catchAsync(async (req, res) => {
  const body = pick(req.body, ['products', 'hour']);
  const delivery = await deliveryService.createDelivery(body, req.user);
  res.status(httpStatus.CREATED).send(delivery);
});

const getDeliveriesByUser = catchAsync(async (req, res) => {
  const { userId } = req.params;
  const deliveries = await deliveryService.getDeliveriesByUserId(userId);
  res.status(httpStatus.OK).send(deliveries);
});

const editDelivery = catchAsync(async (req, res) => {
  const userId = req.user.id;
  const { deliveryId } = req.params;
  const body = pick(req.body, ['completed']);

  if(!await deliveryService.checkIsUserDelivery(userId, deliveryId))
    throw new AppError(httpStatus.FORBIDDEN, 'Forbidden');

  const response = await deliveryService.editDelivery(deliveryId, body);
  res.status(httpStatus.OK).send(response)
});

module.exports = {
  createDelivery,
  getDeliveriesByUser,
  editDelivery,
};
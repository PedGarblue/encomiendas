const httpStatus = require('http-status');
const AppError = require('../../utils/AppError');
const Delivery = require('./delivery.model');
const bikeService = require('../bike/bike.service');

const createDelivery = async (data, user) => {
  const { products, hour } = data;
  const bike = await bikeService.getAvaliableBikeByHour(hour);
  if(!bike) throw new AppError(404, 'Sorry, there are no bikes at this hour.');
  const delivery = new Delivery({
    user,
    bike,
    products,
    hour,
  });
  await delivery.save();
  return delivery;
};

const getDeliveryById = async id => {
  const delivery = await Delivery.findById(id);
  return delivery;
};

const checkIsUserDelivery = async (userId, deliveryId) => {
  const delivery = await getDeliveryById(deliveryId);
  if(!delivery) throw new AppError(httpStatus.NOT_FOUND, 'Delivery not found');
  return delivery.user.toHexString() === userId;
}

const getDeliveriesByUserId = async userId => {
  const deliveries = await Delivery.find({ user: userId, completed: false });
  return deliveries;
};

const editDelivery = async (id, body) => {
  const delivery = await Delivery.findById(id);
  Object.assign(delivery, body);
  await delivery.save();
  return delivery;
}

module.exports = {
  createDelivery,
  getDeliveriesByUserId,
  getDeliveryById,
  checkIsUserDelivery,
  editDelivery,
};
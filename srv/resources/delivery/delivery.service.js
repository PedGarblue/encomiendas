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

module.exports = {
  createDelivery,
};
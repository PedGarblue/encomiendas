const mongoose = require('mongoose');
const Delivery = require('@/srv/resources/delivery/delivery.model');
const { userOne, userTwo } = require('./user.fixture');
const { bikeOne, bikeTwo } = require('./bike.fixture');

const deliveryOne = {
  __v: 0,
  _id: mongoose.Types.ObjectId(),
  user: userOne._id,
  bike: bikeOne._id,
  completed: false,
  products: ['fororo'],
  hour: '10:00AM',
};

const deliveryTwo = {
  __v: 0,
  _id: mongoose.Types.ObjectId(),
  user: userTwo._id,
  bike: bikeTwo._id,
  completed: false,
  products: ['cookies', 'apples'],
  hour: '01:00PM',
};

const insertDeliveries = async deliveries => {
  return Delivery.insertMany(deliveries);
};

const parseDeliveryFixture = delivery => {
  const parsed = {
    ...delivery,
  };
  parsed._id = delivery._id.toHexString();
  parsed.user = delivery.user.toHexString();
  parsed.bike = delivery.bike.toHexString();
  return parsed;
};

module.exports = {
  deliveryOne,
  deliveryTwo,
  parseDeliveryFixture,
  insertDeliveries,
};
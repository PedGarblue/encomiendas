const Bike = require('./bike.model');
const Delivery = require('../delivery/delivery.model');
const { pick } = require('../../utils/object.util');

const getAvaliableBikeByHour = async hour => {
  const deliveries = await Delivery.find({ hour, completed: false });
  const deliveriesOccupied = deliveries.map(delivery => delivery.toJSON().bike);
  const bike = await Bike.findOne({ 
    _id: {
      $not: {
        $in: deliveriesOccupied,
      },
    },
  });
  return bike;
};

const createBike = async body => {
  const data = pick(body, ['plate']);
  const bike = await Bike.create(data);
  return bike;
}; 

const getBikes = async () => {
  const bikes = await Bike.find({});
  return bikes;
};

module.exports = {
  getAvaliableBikeByHour,
  createBike,
  getBikes,
};
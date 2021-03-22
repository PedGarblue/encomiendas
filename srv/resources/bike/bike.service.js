const Bike = require('./bike.model');
const Delivery = require('../delivery/delivery.model');

const getAvaliableBikeByHour = async hour => {
  const deliveries = await Delivery.find({ hour });
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

module.exports = {
  getAvaliableBikeByHour,
};
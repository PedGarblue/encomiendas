const Bike = require('./bike.model');

const getAvaliableBikeByHour = async hour => {
  const bike = await Bike.findOne({ hour: { $not: new RegExp(hour) } });
  return bike;
};

module.exports = {
  getAvaliableBikeByHour,
};
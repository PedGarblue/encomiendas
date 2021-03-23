const createHourList = require('../../utils/createHourList');
const bikeService = require('../bike/bike.service');

const getHours = async () => {
  const hourlist = createHourList();
  let hours = hourlist.map(async hour => {
    const bike = await bikeService.getAvaliableBikeByHour(hour);
    const hourObj = {
      id: hour,
      avaliable: !!bike, 
    };
    return hourObj;
  });
  hours = await Promise.all(hours);
  return hours;
};

module.exports = {
  getHours,
};
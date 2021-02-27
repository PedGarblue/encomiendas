const httpStatus = require('http-status');
const { getHoursList, freeItem, appendItem } = require('./hour.service.js');

const getHours = (req, res) => {
  const hours = getHoursList({ onlyAvaliable: true });
  res.status(httpStatus.OK).json(hours);
};

const updateHour = (req, res) => {
  const { action, hourId, itemId } = req.body;
  let response;

  if(action === 'ADD') {
    freeItem(hourId, itemId)
    res.status(httpStatus.NO_CONTENT).send();
  }
  else{
    response = appendItem(hourId);
    res.status(httpStatus.OK).json(response);
  }
};

module.exports = {
 getHours,
 updateHour,
};
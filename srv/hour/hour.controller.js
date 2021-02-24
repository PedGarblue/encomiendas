import httpStatus from 'http-status';
import { getHoursList, freeItem, appendItem } from './hour.service';

export const getHours = (req, res) => {
  const hours = getHoursList({ onlyAvaliable: true });
  res.status(httpStatus.OK).json(hours);
};

export const updateHour = (req, res) => {
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

import AppError from '../AppError';
import { getHoursList, freeItem, appendItem } from './hour.service';

export const getHours = (req, res) => {
  const hours = getHoursList();
  res.status(200).send(hours);
};

export const updateHour = (req, res) => {
  const { action, hourId, itemId } = req.body;
  let response;

  if (['ADD', 'APPEND'].includes(action)) {
    if(action === 'ADD') {
      freeItem(hourId, itemId)
      res.status(204).send();
    }
    else{
      response = appendItem(hourId);
      res.status(200).send(JSON.stringify(response));
    }
  } else {
    throw new AppError(400, 'Invalid action');
  }
};

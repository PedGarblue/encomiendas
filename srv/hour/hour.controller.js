import AppError from '../AppError';
import { getHoursList, addItemToList, removeItemToList } from './hour.service';

export const getHours = (req, res) => {
  const hours = getHoursList();
  res.status(200).send(hours);
};

export const updateHour = (req, res) => {
  const { action, hourId } = req.body;

  if (['ADD', 'APPEND'].includes(action)) {
    if(action === 'ADD') addItemToList(hourId);
    else removeItemToList(hourId);
    res.status(200).send();
  } else {
    throw new AppError(400, 'Invalid action');
  }
};

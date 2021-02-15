import mcache from 'memory-cache';
import AppError from '../AppError';

export const getHoursList = () => {
  const hours = JSON.parse(mcache.get('hours'));
  return hours;
};

export const addItemToList = (hourid) => {
  const hours = getHoursList();
  const hourBlock = hours[hourid];
  if (!hourBlock) throw new AppError(404, 'Hour block not found');
  if(hourBlock.items < 8) hours[hourid].items += 1;
  mcache.put('hours', JSON.stringify(hours));
};

export const removeItemToList = (hourid) => {
  const hours = getHoursList();
  const hourBlock = hours[hourid];
  if (!hourBlock) throw new AppError(404, 'Hour block not found');
  if(hourBlock.items > 0) hours[hourid].items -= 1;
  mcache.put('hours', JSON.stringify(hours));
};

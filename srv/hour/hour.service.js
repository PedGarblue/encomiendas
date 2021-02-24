import mcache from 'memory-cache';
import AppError from '../utils/AppError';

const findItemAvaliable = itemList => {
  return itemList.find(item => item.avaliable);
};

const findItem = (itemList, itemId) => {
  return itemList.find(item => item.itemId === itemId);
};

export const getHoursList = (options = {}) => {
  const hours = JSON.parse(mcache.get('hours'));
  if(options.onlyAvaliable) return hours.filter(hour => hour.avaliableItems > 0);
  return hours;
};

export const freeItem = (hourid, itemid) => {
  const hours = getHoursList();

  const hourBlock = hours.find(hour => hour.id === hourid);
  if (!hourBlock) throw new AppError(404, 'Hour block not found');

  const item = findItem(hourBlock.items, itemid) || false;
  if (!item) throw new AppError(404, 'Item not found');

  item.avaliable = true;
  hourBlock.avaliableItems += 1;

  mcache.put('hours', JSON.stringify(hours));
};

export const appendItem = (hourid) => {
  const hours = getHoursList();

  const hourBlock = hours.find(hour => hour.id === hourid);
  if(!hourBlock) throw new AppError(404, 'Hour block not found');

  let item = findItemAvaliable(hourBlock.items);
  if(!item) throw new AppError(400, 'Hour not Avaliable');
  item.avaliable = false;
  hourBlock.avaliableItems -= 1;
  mcache.put('hours', JSON.stringify(hours));
  item.id = hourid;

  return item;
};

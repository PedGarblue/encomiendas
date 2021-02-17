import mcache from 'memory-cache';
import AppError from '../AppError';

const findItemAvaliable = (itemList, i = 0) => {
  const item = itemList[i];
  if (item.avaliable) return item;
  else if(i < itemList.length) return findItemAvaliable(itemList, i + 1);
  else return false;
};

const findItem = (itemList, itemId, i = 0) => {
  const item = itemList[i];
  if (item.id === itemId) return item;
  else if(i < itemList.length) return findItem(itemList, i + 1);
  else return false;
};

export const getHoursList = () => {
  const hours = JSON.parse(mcache.get('hours'));
  return hours;
};

export const freeItem = (hourid, itemid) => {
  const hours = getHoursList();
  const hourBlock = hours[hourid];
  if (!hourBlock) throw new AppError(404, 'Hour block not found');
  const item = findItem(hourBlock.items, itemid);

  if (!item) throw new AppError(404, 'Item not found');
  item.avaliable = true;
  mcache.put('hours', JSON.stringify(hours));
};

export const appendItem = (hourid) => {
  const hours = getHoursList();
  const hourBlock = hours[hourid];

  if (!hourBlock) throw new AppError(404, 'Hour block not found');

  let item = findItemAvaliable(hourBlock.items);
  item.avaliable = false;
  mcache.put('hours', JSON.stringify(hours));
  item.hourid = hourid;

  return item;
};

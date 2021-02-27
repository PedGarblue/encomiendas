const defaultData = {
  interval: 30, // 30 minutes interval
  start: 8 * 60, // start at 8:00AM
  limit: 20 * 60, // stop at 8:00PM
  period: ['AM', 'PM'],
};
const createItems = (indexes = [], limit = 8) => {
  // 8 digit random number because yes
  const itemId = Math.floor(Math.random() * (Math.pow(10, 8)));
  indexes.push({
    itemId,
    avaliable: true,
  });
  if(indexes.length < limit) createItems(indexes, limit);
  return indexes;
};

const createHourList = (data = defaultData, array = []) => {
  const hour = Math.floor(data.start / 60);
  const minutes = data.start % 60;
  const hourId = ('0' + ((hour === 12?12:hour % 12))).slice(-2) + ':' + ('0' + minutes).slice(-2) + data.period[Math.floor(hour/12)];
  const hourBlock = {
    id: hourId,
    items: createItems([], 3), 
  };
  hourBlock.avaliableItems = hourBlock.items.length;
  array.push(hourBlock);
  data.start += data.interval;
  if(data.start > data.limit) return array;
  return createHourList(data, array);
};

module.exports = createHourList;

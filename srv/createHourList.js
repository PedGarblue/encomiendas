const defaultData = {
  interval: 30, // 30 minutes interval
  start: 8 * 60, // start at 8:00AM
  limit: 20 * 60, // stop at 8:00PM
  period: ['AM', 'PM'],
};

const createHourList = (data = defaultData, object = {}) => {
  const hour = Math.floor(data.start / 60);
  const minutes = data.start % 60;
  const parsedTime = ('0' + ((hour === 12?12:hour % 12))).slice(-2) + ':' + ('0' + minutes).slice(-2) + data.period[Math.floor(hour/12)];
  const hourBlock = {
    items: 8,
  };
  object[parsedTime] = hourBlock;
  data.start += data.interval;
  if(data.start > data.limit) return object;
  return createHourList(data, object);
};

export default createHourList;

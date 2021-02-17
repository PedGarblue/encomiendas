const getBikes = () => {
  const bikes = JSON.parse(localStorage.getItem('bikes'));
  return bikes || {};
};

const saveBikes = bikes => {
  const json = JSON.stringify(bikes);
  localStorage.setItem('bikes', json);
};

export const saveBike = (hourId, data) => {
  const bikes = getBikes();
  bikes[hourId] = data;
  saveBikes(bikes);
};

export const deleteBike = hourId => {
  const bikes = getBikes();
  if(bikes[hourId]) {
    delete bikes[hourId];
    saveBikes(bikes);
  }
  else console.warn(`Bike at ${hourId} not found`);
};

export const getBike = hourId => {
  const bikes = getBikes();
  if(bikes[hourId]) return bikes[hourId];
  return false;
};

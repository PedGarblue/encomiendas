export const getBikes = () => {
  const bikes = JSON.parse(localStorage.getItem('bikes'));
  return bikes || [];
};

const saveBikes = bikes => {
  const json = JSON.stringify(bikes);
  localStorage.setItem('bikes', json);
};

export const saveBike = bike => {
  const bikes = getBikes();
  bikes.push(bike);
  saveBikes(bikes);
};

export const deleteBike = hourId => {
  const bikes = getBikes();
  saveBikes(bikes.filter(bike => bike.hourId === hourId));
};

export const getBike = hourId => {
  const bikes = getBikes();
  return bikes.find(bike => bike.hourId === hourId);
};

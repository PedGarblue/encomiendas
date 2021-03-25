import request from '../utils/request';
import store from '../store';

export const createBike = data => {
  const { token } = store.getters.accessToken;
  return request({
    url: '/api/bike',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
}

export const getBikes = () => {
  const { token } = store.getters.accessToken;
  return request({
    url: '/api/bike',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
import request from '../utils/request';
import store from '../store';

export const createDelivery = data => {
  const { token } = store.getters.accessToken;
  return request({
    url: '/api/delivery',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data,
  });
};

export const getUserDeliveries = () => {
  const { id } = store.getters.getProfile;
  return request({
    url: `/api/delivery/${id}`,
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
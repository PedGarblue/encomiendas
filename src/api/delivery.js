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

export const confirmDelivery = deliveryId => {
  const { token } = store.getters.accessToken;
  return request({
    url: `/api/delivery/${deliveryId}`,
    method: 'PATCH',
    data: {
      completed: true,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
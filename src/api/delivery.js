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
  const { token } = store.getters.accessToken;
  const { id } = store.getters.getProfile;
  return request({
    url: `/api/delivery/${id}`,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const confirmDelivery = deliveryId => {
  const { token } = store.getters.accessToken;
  return request({
    url: `/api/delivery/${deliveryId}`,
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
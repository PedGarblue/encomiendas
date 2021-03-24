import request from '../utils/request';
import store from '../store';

export const getAvaliableDeliveryHours = () => {
  const { token } = store.getters.accessToken;
  return request({
    url: '/api/hour',
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
/* eslint-disable no-param-reassign */
import request from '../../utils/request';
import { USER_LOAD, USER_LOGOUT, USER_DELIVERIES_REQUEST } from '../actions/user';
import { AUTH_LOGOUT } from '../actions/auth';

const unauthenticatedUser = { role: 'unauthenticated' };

const USER_REQUEST = 'USER_REQUEST';
const USER_SUCCESS = 'USER_SUCCESS';
const USER_ERROR = 'USER_ERROR';

const state = {
  status: '',
  profile: JSON.parse(sessionStorage.getItem('user')) || unauthenticatedUser,
  deliveries: [],
  hasLoadedOnce: false,
};

const getters = {
  getProfile: state => state.profile,
  isProfileLoaded: state => !!state.profile.name && state.hasLoadedOnce,
  userStatus: state => state.status,
  hasPendingDeliveries: state => state.deliveries.length > 0,
  pendingDeliveries: state => state.deliveries,
};

const actions = {
  [USER_LOAD]: ({ getters, commit, dispatch }, user = state.profile) => {
    commit(USER_REQUEST);

    return new Promise((resolve, reject) => {
      const accessToken = getters.accessToken.token;
      const userid = user.id || localStorage.getItem('user');

      request({ url: `/api/user/${userid}`, method: 'GET', headers: { Authorization: `Bearer ${accessToken}` } })
        .then(user => {
          localStorage.setItem('user', user.id);
          sessionStorage.setItem('user', JSON.stringify(user));
          commit(USER_LOAD, user);
          commit(USER_SUCCESS);
          dispatch(USER_DELIVERIES_REQUEST);
          resolve(user);
        })
        .catch(err => {
          commit(USER_ERROR);
          dispatch(USER_LOGOUT);
          reject(err);
        });
    });
  },
  [USER_LOGOUT]: ({ commit, dispatch }) => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    commit(USER_LOGOUT);
    dispatch(AUTH_LOGOUT);
  },
  [USER_DELIVERIES_REQUEST]: ({ getters, commit }) => {
    commit(USER_REQUEST);

    return new Promise((resolve, reject) => {
      const { token } = getters.accessToken;
      const { id } = getters.getProfile;
      request({
        url: `/api/delivery/${id}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(resp => {
          commit(USER_DELIVERIES_REQUEST, resp);
          commit(USER_SUCCESS);
          resolve(resp)
        })
        .catch(err => {
          commit(USER_ERROR);
          reject(err);
        });
    })
  },
};

const mutations = {
  [USER_REQUEST]: state => {
    state.status = 'loading';
  },
  [USER_SUCCESS]: state => {
    state.status = 'success';
  },
  [USER_ERROR]: state => {
    state.status = 'error';
  },
  [USER_LOAD]: (state, resp) => {
    state.hasLoadedOnce = true;
    state.profile = resp;
  },
  [USER_LOGOUT]: state => {
    state.profile = unauthenticatedUser;
    state.status = '';
  },
  [USER_DELIVERIES_REQUEST]: (state, resp) => {
    state.deliveries = resp;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
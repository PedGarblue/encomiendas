/* eslint-disable no-param-reassign */
import request from '../../utils/request';
import {
  AUTH_LOGIN,
  AUTH_LOGOUT,
  AUTH_REFRESH_TOKENS,
  AUTH_AUTO_REFRESH_TOKENS,
  AUTH_REGISTER,
} from '../actions/auth';

const AUTH_REQUEST = 'AUTH_REQUEST';
const AUTH_SUCCESS = 'AUTH_SUCCESS';
const AUTH_ERROR = 'AUTH_ERROR';
const AUTH_REFRESH_TOKEN_TASK = 'AUTH_REFRESH_TOKEN_TASK';

const state = {
  tokens: JSON.parse(localStorage.getItem('user-token')),
  status: '',
  refreshTokenTask: -1,
  hasLoadedOnce: false,
};

const getters = {
  isAuthenticated: state => !!state.tokens && new Date(state.tokens.refresh.expires) > Date.now(),
  authStatus: state => state.status,
  accessToken: state => state.tokens.access,
  refreshToken: state => state.tokens.refresh,
};

const actions = {
  async [AUTH_LOGIN]({ dispatch, commit }, payload) {
    commit(AUTH_REQUEST);

    return new Promise((resolve, reject) => {
      request({ url: '/api/auth/login', data: payload, method: 'POST' })
        .then(resp => {
          const { tokens, user } = resp;
          commit(AUTH_SUCCESS);
          commit(AUTH_LOGIN, tokens);
          dispatch(AUTH_AUTO_REFRESH_TOKENS);
          localStorage.setItem('user-token', JSON.stringify(tokens));

          resolve({ tokens, user });
        })
        .catch(err => {
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          commit(AUTH_ERROR);
          reject(err.message);
        });
    });
  },
  async [AUTH_REGISTER]({ dispatch, commit }, payload) {
    commit(AUTH_REQUEST);

    return new Promise((resolve, reject) => {
      request({ url: '/api/auth/register', data: payload, method: 'POST' })
        .then(resp => {
          const { tokens, user } = resp;
          commit(AUTH_SUCCESS);
          commit(AUTH_LOGIN, tokens);
          dispatch(AUTH_AUTO_REFRESH_TOKENS);
          localStorage.setItem('user-token', JSON.stringify(tokens));

          resolve({ tokens, user });
        })
        .catch(err => {
          localStorage.removeItem('user-token');
          commit(AUTH_ERROR);
          reject(err.message);
        });
    });
  },
  async [AUTH_REFRESH_TOKENS]({ state, dispatch, commit }) {
    const { token } = state.tokens.refresh;
    return new Promise((resolve, reject) => {
      request({ url: '/api/auth/refresh-tokens', data: { refreshToken: token }, method: 'POST' })
        .then(tokens => {
          localStorage.setItem('user-token', JSON.stringify(tokens));
          commit(AUTH_SUCCESS, tokens);
          dispatch(AUTH_AUTO_REFRESH_TOKENS);
          resolve(tokens);
        })
        .catch(err => {
          localStorage.removeItem('user-token'); // if the request fails, remove any possible user token if possible
          commit(AUTH_LOGOUT);
          reject(err.message);
        });
    });
  },
  async [AUTH_AUTO_REFRESH_TOKENS]({ state, dispatch, commit }) {
    const { expires } = state.tokens.access;
    const now = Date.now();
    const expiresDate = new Date(expires).getTime();

    let timeUntilRefresh = expiresDate - now;
    timeUntilRefresh -= 1 * 60 * 1000; // refrescamos 1 minutos antes de expirar el token de acceso
    const refreshTask = setTimeout(
      () => {
        dispatch(AUTH_REFRESH_TOKENS);
      },
      timeUntilRefresh > 0 ? Math.round(timeUntilRefresh) : 0
    );
    commit(AUTH_REFRESH_TOKEN_TASK, refreshTask);
  },
  [AUTH_LOGOUT]: ({ state, commit }) => {
    return new Promise(resolve => {
      commit(AUTH_LOGOUT);
      localStorage.removeItem('user-token');
      clearTimeout(state.refreshTokenTask);
      resolve();
    });
  },
};

const mutations = {
  [AUTH_REQUEST]: state => {
    state.status = 'loading';
  },
  [AUTH_SUCCESS]: (state) => {
    state.status = 'success';
  },
  [AUTH_ERROR]: state => {
    state.status = 'error';
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGIN]: (state, tokens) => {
    state.tokens = tokens;
    state.hasLoadedOnce = true;
  },
  [AUTH_LOGOUT]: state => {
    state.tokens = '';
  },
  [AUTH_REFRESH_TOKEN_TASK]: (state, task) => {
    state.refreshTokenTask = task;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};

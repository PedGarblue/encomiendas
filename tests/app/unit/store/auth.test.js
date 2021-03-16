import faker from 'faker';

import request from '@/src/utils/request';
import authStore from '@/src/store/modules/auth';
import {
  AUTH_LOGIN,
  AUTH_REGISTER,
  AUTH_REFRESH_TOKENS,
  AUTH_AUTO_REFRESH_TOKENS,
  AUTH_LOGOUT,
} from '@/src/store/actions/auth';

import { USER_REQUEST, USER_LOGOUT } from '@/src/store/actions/user';
import { tokens } from '@/tests/app/fixtures/store.fixture';

jest.mock('@/src/utils/request');
Storage.prototype.setItem = jest.fn();
Storage.prototype.removeItem = jest.fn();

describe('Auth Global Store', () => {
  let stateModules;

  beforeEach(() => {
    stateModules = {
      state: {
        tokens,
      },
      commit: jest.fn(),
      dispatch: jest.fn(),
    };
  });

  afterEach(() => {
    Storage.prototype.setItem.mockClear();
    Storage.prototype.removeItem.mockClear();
    request.mockClear();
  });

  describe('Actions', () => {
    describe('AUTH_LOGIN', () => {
      let resolve;
      let userLogin;

      beforeEach(() => {
        resolve = {
          tokens: {},
          user: {},
        };
        request.mockResolvedValue(resolve);
        userLogin = {
          name: faker.internet.userName(),
          password: faker.internet.password(),
        };
      });

      test('should make login request successfully', async () => {
        await expect(authStore.actions[AUTH_LOGIN](stateModules, userLogin)).resolves.toEqual(resolve);
        expect(request).toBeCalledWith({ url: '/api/auth/login', data: userLogin, method: 'POST' });
      });

      test('should save the user tokens in the LocalStorage', async () => {
        await authStore.actions[AUTH_LOGIN](stateModules, userLogin);
        expect(Storage.prototype.setItem).toBeCalledWith('user-token', JSON.stringify(resolve.tokens));
      });
      test('should commit AUTH_SUCCESS and dispatch USER_REQUEST, AUTH_AUTO_REFRESH_TOKENS', async () => {
        await authStore.actions[AUTH_LOGIN](stateModules, userLogin);
        expect(stateModules.commit).toBeCalledWith('AUTH_LOGIN', resolve.tokens);
        expect(stateModules.dispatch).nthCalledWith(1, USER_REQUEST, resolve.user);
        expect(stateModules.dispatch).nthCalledWith(2, AUTH_AUTO_REFRESH_TOKENS);
      });

      test('should remove user token and commit error on login request failure', async () => {
        request.mockRejectedValue(new Error('some error'));
        await expect(authStore.actions[AUTH_LOGIN](stateModules, userLogin)).rejects.toThrow();
        expect(stateModules.commit).toBeCalledWith('AUTH_ERROR');
        expect(Storage.prototype.removeItem).toBeCalledWith('user-token');
      });
    });

    describe('AUTH_REGISTER', () => {
      let resolve;
      let newUser;

      beforeEach(() => {
        resolve = {
          tokens: {},
          user: {},
        };
        request.mockResolvedValue(resolve);
        newUser = {
          name: faker.internet.userName(),
          password: faker.internet.password(),
        };
      });

      test('should make register request successfully', async () => {
        await expect(authStore.actions[AUTH_REGISTER](stateModules, newUser)).resolves.toEqual(resolve);
        expect(request).toBeCalledWith({ url: '/api/auth/register', data: newUser, method: 'POST' });
      });
    });

    describe('AUTH_REFRESH_TOKENS', () => {
      let resolve;

      beforeEach(() => {
        resolve = {};
        request.mockResolvedValue(resolve);
      });

      test('should make refresh token request successfully and save the new tokens in LocalStorage', async () => {
        await expect(authStore.actions[AUTH_REFRESH_TOKENS](stateModules)).resolves.toEqual(resolve);
        expect(Storage.prototype.setItem).toBeCalledWith('user-token', JSON.stringify(resolve));
      });

      test('should commit AUTH_SUCCESS, and dispatch AUTH_AUTO_REFRESH_TOKENS', async () => {
        await expect(authStore.actions[AUTH_REFRESH_TOKENS](stateModules)).resolves.toEqual(resolve);
        expect(stateModules.commit).toBeCalledWith('AUTH_SUCCESS', resolve);
        expect(stateModules.dispatch).toBeCalledWith(AUTH_AUTO_REFRESH_TOKENS);
      });

      test('should remove user token and commit error on login request failure', async () => {
        request.mockRejectedValue(new Error('some error'));
        await expect(authStore.actions[AUTH_REFRESH_TOKENS](stateModules)).rejects.toThrow();
        expect(stateModules.commit).toBeCalledWith('AUTH_LOGOUT');
        expect(Storage.prototype.removeItem).toBeCalledWith('user-token');
      });
    });

    describe('AUTH_AUTO_REFRESH_TOKENS', () => {
      test('should create a new timeout and commit AUTH_REFRESH_TOKEN_TASK', () => {
        const now = Date.now();
        const timeoutTime = new Date(stateModules.state.tokens.access.expires).getTime() - now - 60000;
        jest.spyOn(Date, 'now').mockReturnValue(now);
        const task = 1;
        window.setTimeout = jest.fn();
        setTimeout.mockReturnValue(task);

        authStore.actions[AUTH_AUTO_REFRESH_TOKENS](stateModules);

        expect(stateModules.commit).toBeCalledWith('AUTH_REFRESH_TOKEN_TASK', task);
        setTimeout.mock.calls[0][0]();
        expect(stateModules.dispatch).toBeCalledWith(AUTH_REFRESH_TOKENS);
        expect(setTimeout.mock.calls[0][1]).toEqual(timeoutTime);
      });
    });

    describe('AUTH_LOGOUT', () => {
      test('should commit USER_LOGOUT and dispatch USER_LOGOUT', async () => {
        await authStore.actions[AUTH_LOGOUT](stateModules);
        expect(stateModules.commit).toBeCalledWith(AUTH_LOGOUT);
        expect(stateModules.dispatch).toBeCalledWith(USER_LOGOUT);
      });

      test('should delete user token and the auto refresh token task', async () => {
        window.clearTimeout = jest.fn();
        await authStore.actions[AUTH_LOGOUT](stateModules);
        expect(Storage.prototype.removeItem).toBeCalledWith('user-token');
        expect(clearTimeout).toBeCalledWith(stateModules.state.refreshTokenTask);
      });
    });
  });
});
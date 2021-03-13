const request = require('supertest');
const httpStatus = require('http-status');

const app = require('@/srv/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, userTwo, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

describe('User routes', () => {
  describe('GET /user/:userId', () => {
    test('should return 200 and the user object if data is ok', async () => {
      await insertUsers([userOne]);

      const res = await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(res.body).not.toHaveProperty('password');
      expect(res.body).toEqual({
        id: userOne._id.toHexString(),
        name: userOne.name,
        role: userOne.role,
      });
    });

    test('should return 401 error if access token is missing', async () => {
      await insertUsers([userOne]);

      await request(app)
        .get(`/api/user/${userOne._id}`)
        .send()
        .expect(httpStatus.UNAUTHORIZED);
    });

    test('should return 403 error if user is trying to get another user', async () => {
      await insertUsers([userOne, userTwo]);

      await request(app)
        .get(`/api/user/${userTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.FORBIDDEN);
    });

    test('should return 200 and the user object if admin is trying to get another user', async () => {
      await insertUsers([userOne, admin]);

      await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);
    });

    test('should return 400 error if userId is not a valid mongo id', async () => {
      await insertUsers([admin]);

      await request(app)
        .get('/api/user/invalidId')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.BAD_REQUEST);
    });

    test('should return 404 error if user is not found', async () => {
      await insertUsers([admin]);

      await request(app)
        .get(`/api/user/${userOne._id}`)
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.NOT_FOUND);
    });
  });
});
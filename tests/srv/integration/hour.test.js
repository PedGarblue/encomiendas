const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('@/srv/app');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');
const { bikeOne, bikeTwo, insertBikes } = require('../fixtures/bike.fixture');
const { deliveryOne, deliveryTwo, insertDeliveries } = require('../fixtures/delivery.fixture');

setupTestDB();

describe('Hour routes', () => {
  describe('GET /hour', () => {
    it('returns 200 with a list of avaliable hours', async () => {
      await insertUsers([userOne]);
      await insertBikes([bikeOne]);
      await insertDeliveries([deliveryOne])

      const resp = await request(app)
        .get('/api/hour')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      expect(resp.body[0]).toEqual({
        id: '08:00AM',
        avaliable: true,
      });
      expect(resp.body[resp.body.length - 1]).toEqual({
        id: '08:00PM',
        avaliable: true,
      });
      const occupiedHour = resp.body
        .find(hour => hour.id === deliveryOne.hour);
      expect(occupiedHour).toBeDefined();
      expect(occupiedHour.avaliable).toBeFalsy();
    });

    it('returns 401 if access token is missing', async () => {
      const resp = await request(app)
        .get('/api/hour')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send();
      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      });
    });
  });
});
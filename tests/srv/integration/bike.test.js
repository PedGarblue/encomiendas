const request = require('supertest');
const faker = require('faker');
const httpStatus = require('http-status');
const app = require('@/srv/app');
const Bike = require('@/srv/resources/bike/bike.model');
const setupTestDB = require('../utils/setupTestDB');
const { userOne, admin, insertUsers } = require('../fixtures/user.fixture');
const { userOneAccessToken, adminAccessToken } = require('../fixtures/token.fixture');
const { insertBikes, bikeOne, bikeTwo } = require('../fixtures/bike.fixture');

setupTestDB();

describe('Bike routes', () => {
  describe('POST /api/bike', () => {
    let newBike;

    beforeEach(() => {
      newBike = {
        plate: faker.vehicle.vin(),
      };
    });

    it('returns 201 and creates successfully a bike', async () => {
      await insertUsers([admin]);
      const resp = await request(app)
        .post('/api/bike')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newBike)
        .expect(httpStatus.CREATED);

      expect(resp.body).toEqual({
        id: expect.anything(),
        plate: newBike.plate,
      });

      const bikeDb = await Bike.findById(resp.body.id);
      expect(bikeDb).toBeDefined();
      expect(bikeDb).toMatchObject({
        plate: newBike.plate,
      });
    });

    it('returns 400 if plate is missing', async () => {
      await insertUsers([admin]);
      delete newBike.plate;
      const resp = await request(app)
        .post('/api/bike')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send(newBike);
      expect(resp.body).toEqual({
        code: httpStatus.BAD_REQUEST,
        message: '"plate" is required',
      });
    });

    it('returns 401 if access token is missing', async () => {
      const resp = await request(app)
        .post('/api/bike')
        .send(newBike);
      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      });
    });

    it('returns 403 if user is trying to create a bike', async () => {
      await insertUsers([userOne]);
      const resp = await request(app)
        .post('/api/bike')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newBike);
      expect(resp.body).toEqual({
        code: httpStatus.FORBIDDEN,
        message: 'Forbidden',
      });
    });
  });

  describe('GET /api/bike', () => {
    it('returns 200 with a list of bikes', async () => {
      await insertUsers([admin]);
      await insertBikes([bikeOne, bikeTwo]);

      const resp = await request(app)
        .get('/api/bike')
        .set('Authorization', `Bearer ${adminAccessToken}`)
        .send()
        .expect(httpStatus.OK);

      expect(resp.body).toBeInstanceOf(Array);
      expect(resp.body).toHaveLength(2); 
      expect(resp.body[0]).toEqual({
        id: bikeOne._id.toHexString(),
        plate: bikeOne.plate,
      }); 
    });

    it('returns 401 if access token is missing', async () => {
      await insertUsers([admin]);

      const resp = await request(app)
        .get('/api/bike')
        .send();
      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      })
    });

    it('returns 403 if user is trying to get a bike list', async () => {
      await insertUsers([userOne]);
      const resp = await request(app)
        .get('/api/bike')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send();
      expect(resp.body).toEqual({
        code: httpStatus.FORBIDDEN,
        message: 'Forbidden',
      })
    });
  });
});
const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const app = require('@/srv/app');
const createHourlist = require('@/srv/utils/createHourList');
const Delivery = require('@/srv/resources/delivery/delivery.model');
const setupTestDB = require('../utils/setupTestDB');
const { bikeOne, insertBikes } = require('../fixtures/bike.fixture');
const { userOne, insertUsers } = require('../fixtures/user.fixture');
const { deliveryOne, insertDeliveries } = require('../fixtures/delivery.fixture');
const { userOneAccessToken } = require('../fixtures/token.fixture');

setupTestDB();

const products = ['cookies', 'apples', 'fororo'];
const hourList = createHourlist();

describe('Delivery routes', () => {
  describe('POST /delivery', () => {
    let newDelivery;

    beforeEach(() => {
      newDelivery = {
        hour: hourList[faker.random.number(hourList.length - 1)],
        products, 
      };
    });

    it('creates a delivery and returns 201 with created delivery', async () => {
      await insertBikes([bikeOne]);
      await insertUsers([userOne]);
      
      const resp = await request(app)
        .post('/api/delivery')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery)
        .expect(httpStatus.CREATED);

      expect(resp.body).toEqual({
        __v: 0,
        _id: expect.anything(),
        user: userOne._id.toHexString(),
        bike: bikeOne._id.toHexString(),
        completed: false,
        products: newDelivery.products,
        hour: newDelivery.hour,
      });
      const deliverydb = await Delivery.findById(resp.body._id);
      expect(deliverydb.toJSON()).toMatchObject({
        user: userOne._id,
        bike: bikeOne._id,
        completed: false,
        products: newDelivery.products,
        hour: newDelivery.hour,
      });
    });

    it('return 400 if has invalid products', async () => {
      await insertBikes([bikeOne]);
      await insertUsers([userOne]);
      
      newDelivery.products = ['weird'];

      const resp = await request(app)
        .post('/api/delivery')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery)

      expect(resp.body).toEqual({
        code: httpStatus.BAD_REQUEST,
        message: "Product list doesn't includes valid products",
      });
    });

    it('return 400 if has invalid hour', async () => {
      await insertBikes([bikeOne]);
      await insertUsers([userOne]);
      
      newDelivery.hour = 'weird';

      const resp = await request(app)
        .post('/api/delivery')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery)

      expect(resp.body).toEqual({
        code: httpStatus.BAD_REQUEST,
        message: '"hour" should be a valid hour pattern',
      });
    });

    it('returns 401 if access token is missing', async () => {
      const resp = await request(app)
        .post('/api/delivery')
        .send(newDelivery)
      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      });
    });

    it('returns 404 if there is no bikes avaliable', async () => {
      await insertUsers([userOne]);
      await insertBikes([bikeOne]);
      await insertDeliveries([deliveryOne]);

      newDelivery.hour = deliveryOne.hour;
      
      const resp = await request(app)
        .post('/api/delivery')
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery);
      expect(resp.body).toEqual({
        code: httpStatus.NOT_FOUND,
        message: 'Sorry, there are no bikes at this hour.',
      });
    });
  });

  describe('GET /delivery/:deliveryid', () => {
    it('returns succesfully a delivery', () => {});
  });

  describe('PATCH /delivery/:deliveryid', () => {
    it('updates successfully a delivery', () => {});
  });

  describe('DELETE /delivery/delivery:id', () => {
    it('delete successfully a delivery', () => {});
  });
});
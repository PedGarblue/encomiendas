const request = require('supertest');
const httpStatus = require('http-status');
const faker = require('faker');
const app = require('@/srv/app');
const createHourlist = require('@/srv/utils/createHourList');
const { omit } = require('@/srv/utils/object.util');
const Delivery = require('@/srv/resources/delivery/delivery.model');
const setupTestDB = require('../utils/setupTestDB');
const { bikeOne, insertBikes } = require('../fixtures/bike.fixture');
const { userOne, userTwo, insertUsers } = require('../fixtures/user.fixture');
const { deliveryOne, deliveryTwo, parseDeliveryFixture, insertDeliveries } = require('../fixtures/delivery.fixture');
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

  describe('GET /delivery/:userId', () => {
    it('returns 200 with the user delivery list', async () => {
      await insertDeliveries([deliveryOne]);
      await insertUsers([userOne]);

      const resp = await request(app)
        .get(`/api/delivery/${userOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send()
        .expect(httpStatus.OK);
      const { body } = resp;
      expect(body).toHaveLength(1);
      expect(body[0]).toEqual({
        __v: 0,
        _id: expect.anything(),
        user: userOne._id.toHexString(),
        bike: bikeOne._id.toHexString(),
        completed: false,
        products: deliveryOne.products,
        hour: deliveryOne.hour,
      })
    });

    it('returns 401 if access token is missing',async () => {
      const resp = await request(app)
        .get(`/api/delivery/${userOne._id}`)
        .send();

      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      });
    });

    it('returns 403 if is requesting another user delivery list',async () => {
      await insertUsers([userOne, userTwo]);
      const resp = await request(app)
        .get(`/api/delivery/${userTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send();

      expect(resp.body).toEqual({
        code: httpStatus.FORBIDDEN,
        message: 'Forbidden',
      });
    });
  });

  describe('GET /delivery/:deliveryid', () => {
    it('returns succesfully a delivery', () => {});
  });

  describe('PATCH /delivery/:deliveryid', () => {
    let newDelivery;

    beforeEach(() => {
      newDelivery = {
        completed: true,
      };
    });

    it('updates successfully a delivery', async () => {
      await insertUsers([userOne]);
      await insertDeliveries([deliveryOne]);

      const resp = await request(app)
        .patch(`/api/delivery/${deliveryOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery)
        .expect(httpStatus.OK);

      const body = resp.body;
      const delivery = parseDeliveryFixture(deliveryOne);
      expect(body).toEqual(Object.assign(delivery, newDelivery));

      const deliveryDB = await Delivery.findById(deliveryOne._id);
      expect(deliveryDB).toBeDefined();
      expect(deliveryDB.toJSON()).toMatchObject(Object.assign(deliveryOne, newDelivery));
    });

    it('returns 400 if has invalid body params', async () => {
      await insertUsers([userOne]);
      newDelivery.user = userTwo._id;

      const resp = await request(app)
        .patch(`/api/delivery/${deliveryOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery);
      expect(resp.body).toEqual({
        code: httpStatus.BAD_REQUEST,
        message: '"user" is not allowed',
      });
    });

    it('returns 401 if access token is missing', async () => {
      const resp = await request(app)
        .patch(`/api/delivery/${deliveryOne._id}`)
        .send(newDelivery);
      expect(resp.body).toEqual({
        code: httpStatus.UNAUTHORIZED,
        message: 'Please authenticate',
      });
    });

    it('returns 403 if is user trying to edit other user Delivery', async () => {
      await insertUsers([userOne, userTwo]);
      await insertDeliveries([deliveryTwo]);

      const resp = await request(app)
        .patch(`/api/delivery/${deliveryTwo._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery);
      expect(resp.body).toEqual({
        code: httpStatus.FORBIDDEN,
        message: 'Forbidden',
      });
    })

    it('return 404 if delivery is not found', async () => {
      await insertUsers([userOne]);

      const resp = await request(app)
        .patch(`/api/delivery/${deliveryOne._id}`)
        .set('Authorization', `Bearer ${userOneAccessToken}`)
        .send(newDelivery);
      expect(resp.body).toEqual({
        code: httpStatus.NOT_FOUND,
        message: 'Delivery not found',
      });
    });
  });

  describe('DELETE /delivery/delivery:id', () => {
    it('delete successfully a delivery', () => {});
  });
});
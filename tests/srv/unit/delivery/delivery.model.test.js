const mongoose = require('mongoose');
const setupTestDB = require('../../utils/setupTestDB');
const Delivery = require('@/srv/resources/delivery/delivery.model');

setupTestDB();

describe('Delivery model', () => {
  let newDelivery;

  beforeEach(() => {
    newDelivery = {
      bike: mongoose.Types.ObjectId(),
      user: mongoose.Types.ObjectId(),
      completed: false,
      products: ['cookies'],
      hour: '8:00AM',
    };
  });

  describe('Delivery Validation', () => {
    it('validates a valid Delivery', async () => {
      await expect(new Delivery(newDelivery).validate()).resolves.toBeUndefined();
    });

    it('throws an error if has an invalid product', async () => {
      newDelivery.products = ['weird'];
      await expect(new Delivery(newDelivery).validate()).rejects.toThrow('Invalid products');
    });

    it('throws an error if has an invalid hour', async () => {
      newDelivery.hour = 'weird';
      await expect(new Delivery(newDelivery).validate()).rejects.toThrow('Invalid hour');
    });
  })
});
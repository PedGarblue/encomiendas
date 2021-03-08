const mongoose = require('mongoose');
const setupTestDB = require('../../utils/setupTestDB');
const Delivery = require('@/srv/resources/delivery/delivery.model');

setupTestDB();

describe('Delivery model', () => {
  let newDelivery;

  beforeEach(() => {
    newDelivery = {
      completed: false,
      bike: mongoose.Types.ObjectId(),
      user: mongoose.Types.ObjectId(),
    };
  });

  describe('Delivery Validation', () => {
    it('validates a valid Delivery', async () => {
      await expect(new Delivery(newDelivery).validate()).resolves.toBeUndefined();
    });
  })
});
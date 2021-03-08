const faker = require('faker');
const setupTestDB = require('../../utils/setupTestDB');
const Bike = require('@/srv/resources/bike/bike.model');

setupTestDB();

describe('Bike model', () => {
  let newBike;

  beforeEach(() => {
    newBike = {
      plate: faker.vehicle.vin(),
    };
  });

  describe('Bike Validation', () => {
    it('validates a valid Bike', async () => {
      await expect(new Bike(newBike).validate()).resolves.toBeUndefined();
    });
  })
});
const mongoose = require('mongoose');
const faker = require('faker');
const Bike = require('@/srv/resources/bike/bike.model');

const bikeOne = {
  _id: mongoose.Types.ObjectId(),
  plate: faker.vehicle.vin(),
};

const bikeTwo = {
  _id: mongoose.Types.ObjectId(),
  plate: faker.vehicle.vin(),
};

const insertBikes = async bikes => {
  return Bike.insertMany(bikes);
};

module.exports = {
  bikeOne,
  bikeTwo,
  insertBikes,
};
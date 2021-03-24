const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const bikeValidation = require('./bike.validation');
const bikeController = require('./bike.controller');

const router = express.Router();

router
  .route('/')
    .get(auth('manageBikes'), validate(bikeValidation.getBikes), bikeController.getBikes)
    .post(auth('manageBikes'), validate(bikeValidation.createBike), bikeController.createBike);

module.exports = router;
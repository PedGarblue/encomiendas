const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const deliveryValidation = require('./delivery.validation');
const deliveryController = require('./delivery.controller');

const router = express.Router();

router.post('/', auth('useBikes'), validate(deliveryValidation.createDelivery), deliveryController.createDelivery);

module.exports = router;
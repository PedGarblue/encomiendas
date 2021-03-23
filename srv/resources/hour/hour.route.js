const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const hourValidation = require('./hour.validation');
const hourController = require('./hour.controller');

const router = express.Router();

router.get('/', auth('useBikes'), validate(hourValidation.getHours), hourController.getHours);

module.exports = router;
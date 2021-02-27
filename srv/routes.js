const express = require('express');
const  validate = require('./middlewares/validate.js');
const { getHours, updateHour } = require('./hour/hour.controller.js');
const { updateHour: updateHourValidation } = require('./hour/hour.validation.js');

const router = express.Router();

router
  .route('/hour')
  .get(getHours)
  .patch(validate(updateHourValidation), updateHour);

module.exports = router;

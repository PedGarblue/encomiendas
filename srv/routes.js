import express from 'express';
import validate from './middlewares/validate';
import { getHours, updateHour } from './hour/hour.controller';
import { updateHour as updateHourValidation } from './hour/hour.validation';

const router = express.Router();

router
  .route('/hour')
  .get(getHours)
  .patch(validate(updateHourValidation), updateHour);

export default router;

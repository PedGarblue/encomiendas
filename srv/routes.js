import express from 'express';
import { getHours, updateHour } from './hour/hour.controller';

const router = express.Router();

router
  .route('/hour')
  .get(getHours)
  .patch(updateHour);

export default router;

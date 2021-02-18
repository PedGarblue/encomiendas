import express from 'express';
import cors from 'cors';
import mcache from 'memory-cache';
import createHourList from './utils/createHourList';
import routes from './routes';
import { errorHandler, errorConverter } from './middlewares/error';

export default app => {
  const hourList = createHourList();
  mcache.put('hours', JSON.stringify(hourList));
  app.use(express.json());
  app.use(cors({ origin : '*' }));
  app.use(routes);
  app.use(errorConverter);
  app.use(errorHandler);
}

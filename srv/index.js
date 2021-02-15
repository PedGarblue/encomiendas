import express from 'express';
import cors from 'cors';
import mcache from 'memory-cache';
import { errorHandler, errorConverter } from './error';
import routes from './routes';
import createHourList from './createHourList';

export default (app, http) => {
  const hourList = createHourList();
  mcache.put('hours', JSON.stringify(hourList));
  app.use(express.json());
  app.use(cors({ origin : 'http://localhost:8080' }));
  app.use(routes);
  app.use(errorConverter);
  app.use(errorHandler);
}

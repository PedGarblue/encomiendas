const express = require('express');
const cors = require('cors');
const mcache = require('memory-cache');
const createHourList = require('./utils/createHourList');
const routes = require('./routes');
const { errorHandler, errorConverter } = require('./middlewares/error');

const hourList = createHourList();
mcache.put('hours', JSON.stringify(hourList));

const app = express();

app.use(express.json());
app.use(cors({ origin : '*' }));
app.use(routes);
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;
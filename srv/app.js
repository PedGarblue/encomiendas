const express = require('express');
const cors = require('cors');
const mcache = require('memory-cache');
const passport = require('passport');
const createHourList = require('./utils/createHourList');
const { jwtStrategy } = require('./passport');
const routes = require('./routes');
const { errorHandler, errorConverter } = require('./middlewares/error');

const hourList = createHourList();
mcache.put('hours', JSON.stringify(hourList));

const app = express();

app.use(express.static('dist'));
app.use(express.json());

// jwt authentication
app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

// cors
app.use(cors({ origin : '*' }));

// routes
app.use('/api', routes);

// error handling
app.use(errorConverter);
app.use(errorHandler);

module.exports = app;

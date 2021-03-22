const express = require('express');
const authRoute = require('./resources/auth/auth.route');
const userRoute = require('./resources/user/user.route');
const deliveryRoute = require('./resources/delivery/delivery.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,    
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/delivery',
    route: deliveryRoute,
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;

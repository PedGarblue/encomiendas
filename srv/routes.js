const express = require('express');
const authRoute = require('./resources/auth/auth.route');
const userRoute = require('./resources/user/user.route');

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
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;

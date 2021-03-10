const express = require('express');
const authRoute = require('./resources/auth/auth.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,    
  },
];

defaultRoutes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;

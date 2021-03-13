const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '../')

if(fs.existsSync(envPath)) dotenv.config({ envPath });

const roles = ['admin', 'user'];
const roleRights = new Map();

roleRights.set(roles[0], ['userData', 'manageBikes']);
roleRights.set(roles[1], ['useBikes']);

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
    options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    accessExpirationMinutes: process.env.JWT_ACCESS_EXPIRATION_MINUTES,
    refreshExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS,
    resetPasswordExpirationMinutes: 10,
  },
  roles,
  roleRights,
};
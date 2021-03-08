const dotenv = require('dotenv');
const path = require('path');
const fs = require('fs');

const envPath = path.join(__dirname, '../')

if(fs.existsSync(envPath)) dotenv.config({ envPath });

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoose: {
    url: process.env.MONGODB_URL + (process.env.NODE_ENV === 'test' ? '-test' : ''),
    options: { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true },
  },
};
#!/usr/bin/env node
const mongoose = require('mongoose');
const config = require('../srv/config');
const { createUser } = require('../srv/resources/user/user.service');

const defaultData = {
  name: 'admin',
  password: 'password111',
  role: 'admin',
};

mongoose.connect(config.mongoose.url, config.mongoose.options)
  .then(async () => {
    console.log('Connected to MongoDB');
    const user = await createUser(defaultData);
    console.log('Admin created!');
    console.log(`Now you can log in as "${user.name}" with the password "${defaultData.password}"`);
    console.log(`User password hash: ${user.password}`);
    process.exit(1);
  });

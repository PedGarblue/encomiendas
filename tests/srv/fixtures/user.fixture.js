const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const faker = require('faker');
const User = require('@/srv/resources/user/user.model');

const password = 'password1';
const salt = bcrypt.genSaltSync(8);
const hashedPassword = bcrypt.hashSync(password, salt);

const userOne = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  password,
  role: 'user',
};

const userTwo = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  password,
  role: 'user',
};

const admin = {
  _id: mongoose.Types.ObjectId(),
  name: faker.name.findName(),
  password,
  role: 'admin',
};

const insertUsers = async users => {
  await User.insertMany(users.map(user => ({ ...user, password: hashedPassword })));
};

module.exports = {
  userOne,
  userTwo,
  admin,
  insertUsers,
};
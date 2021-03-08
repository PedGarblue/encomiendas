const faker = require('faker');
const setupTestDB = require('../../utils/setupTestDB');
const User = require('@/srv/resources/user/user.model');

setupTestDB();

describe('User model', () => {
  describe('User validation', () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        name: faker.name.findName(),
        password: 'password1',
      };
    });

    it('correctly validate a valid user', async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    it('throw a validation error if password length is less than 8 characters', async () => {
      newUser.password = 'passwo1';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    it('throw a validation error if password does not contain numbers', async () => {
      newUser.password = 'password';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    it('throw a validation error if password does not contain letters', async () => {
      newUser.password = '11111111';
      await expect(new User(newUser).validate()).rejects.toThrow();
    });
  });

  describe('User toJSON()', () => {
    it('not return user password when toJSON is called', () => {
      const newUser = {
        name: faker.name.findName(),
        password: 'password1',
      };
      expect(new User(newUser).toJSON()).not.toHaveProperty('password');
    });
  });
});
const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const userValidation = require('./user.validation');
const userController = require('./user.controller');

const router = express.Router();

router.get('/:userId', auth('userData'), validate(userValidation.getUser), userController.getUser);

module.exports = router;
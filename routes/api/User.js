const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/api/User');

router.post('/signup', UserController.register);
router.post('/signin', UserController.login);

module.exports = router;
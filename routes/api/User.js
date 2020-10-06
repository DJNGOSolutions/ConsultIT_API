const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/api/User');

router.post('/signup', UserController.register);

module.exports = router;
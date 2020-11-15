const express = require('express');
const router = express.Router();

const UserController = require('../../controllers/api/User');

router.get("/findAll", UserController.findAll);

router.post('/signup', UserController.register);
router.post('/signin', UserController.login);

router.delete("/deleteByID", UserController.deleteByID);

module.exports = router;
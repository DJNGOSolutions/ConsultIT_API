const express = require('express');
const router = express.Router();

const UserRouter = require("./api/User");

router.use('/user', UserRouter);

module.exports = router;
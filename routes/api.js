const express = require('express');
const router = express.Router();

const UserRouter = require("./api/User");
const CityRouter = require("./api/City");

router.use('/user', UserRouter);
router.use('/city', CityRouter);

module.exports = router;
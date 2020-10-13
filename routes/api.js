const express = require('express');
const router = express.Router();

const UserRouter = require("./api/User");
const CityRouter = require("./api/City");
const StateRouter = require("./api/State");

router.use('/user', UserRouter);
router.use('/city', CityRouter);
router.use('/state', StateRouter);

module.exports = router;
const express = require('express');
const router = express.Router();

const BusinessRouter = require("./api/Business");
const UserRouter = require("./api/User");
const CityRouter = require("./api/City");

router.use('/business', BusinessRouter);
router.use('/user', UserRouter);
router.use('/city', CityRouter);

module.exports = router;
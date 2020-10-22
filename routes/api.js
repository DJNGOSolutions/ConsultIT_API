const express = require('express');
const router = express.Router();

const BusinessRouter = require("./api/Business");
const BusinessLineRouter = require("./api/BusinessLine");
const BusinessSectorRouter = require("./api/BusinessSector");
const UserRouter = require("./api/User");
const CityRouter = require("./api/City");
const StateRouter = require("./api/State");

router.use('/business', BusinessRouter);
router.use('/businessLine', BusinessLineRouter);
router.use('/businessSector', BusinessSectorRouter);
router.use('/user', UserRouter);
router.use('/city', CityRouter);
router.use('/state', StateRouter);

module.exports = router;
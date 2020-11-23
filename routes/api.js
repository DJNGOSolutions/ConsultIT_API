const express = require('express');
const router = express.Router();

const BusinessRouter = require("./api/Business");
const BusinessLineRouter = require("./api/BusinessLine");
const BusinessSectorRouter = require("./api/BusinessSector");
const CashFlowRouter = require("./api/CashFlow");
const CityRouter = require("./api/City");
const ConsultantRouter = require("./api/Consultant");
const ConsultantTypeRouter = require("./api/ConsultantType");
const EntrepreneurRouter = require("./api/Entrepreneur");
const StateRouter = require("./api/State");
const UserRouter = require("./api/User");

router.use('/business', BusinessRouter);
router.use('/businessLine', BusinessLineRouter);
router.use('/businessSector', BusinessSectorRouter);
router.use('/cashflow', CashFlowRouter);
router.use('/city', CityRouter);
router.use('/consultant', ConsultantRouter);
router.use('/consultanttype', ConsultantTypeRouter);
router.use('/entrepreneur', EntrepreneurRouter);
router.use('/state', StateRouter);
router.use('/user', UserRouter);

module.exports = router;
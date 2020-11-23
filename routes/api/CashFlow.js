const express = require('express');
const router = express.Router();

const CashFlowController = require('./../../controllers/api/CashFlow');

router.post('/calculate', CashFlowController.calculateCashFlow);
router.post('/save', CashFlowController.saveCashFlow);

module.exports = router;
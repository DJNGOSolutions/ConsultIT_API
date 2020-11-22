const express = require('express');
const router = express.Router();

const ContractController = require('./../../controllers/api/Contract');

router.post('/create', ContractController.createNewContract);

module.exports = router;
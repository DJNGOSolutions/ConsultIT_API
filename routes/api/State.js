const express = require('express');
const router = express.Router();

const StateController = require('./../../controllers/api/State');

router.post('/newstate', StateController.addNewState);

module.exports = router;
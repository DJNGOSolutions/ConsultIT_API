const express = require('express');
const router = express.Router();

const StateController = require('./../../controllers/api/State');

router.post('/newState', StateController.addNewState);

router.get('/findAll', StateController.findAll);

router.delete('/delete', StateController.delete);

module.exports = router;
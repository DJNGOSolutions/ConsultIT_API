const express = require('express');
const router = express.Router();

const CityController = require('../../controllers/api/City');

router.post('/newcity', CityController.addNewCity);

module.exports = router;
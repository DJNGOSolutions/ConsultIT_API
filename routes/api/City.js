const express = require('express');
const router = express.Router();

const CityController = require('../../controllers/api/City');

router.post('/new', CityController.addNewCity);
router.get('/all', CityController.findAllCities);

module.exports = router;
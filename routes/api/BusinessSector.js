const express = require('express');
const router = express.Router();

const BusinessSectorController = require('../../controllers/api/BusinessSector');

router.post('/create', BusinessSectorController.create);

router.get('/findAll', BusinessSectorController.findAll);

router.delete('/delete', BusinessSectorController.delete);

module.exports = router;
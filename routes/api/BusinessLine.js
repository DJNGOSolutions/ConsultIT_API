const express = require("express");
const router = express.Router();

const BusinessLineController = require('../../controllers/api/BusinessLine');

router.post("/create", BusinessLineController.create);

router.get("/findAll", BusinessLineController.findAll);

module.exports = router;
const express = require("express");
const router = express.Router();

const BusinessLineController = require('../../controllers/api/BusinessLine');

router.post("/create", BusinessLineController.create);

router.get("/findAll", BusinessLineController.findAll);

router.delete("/delete", BusinessLineController.delete);

module.exports = router;
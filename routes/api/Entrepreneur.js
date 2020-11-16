const express = require("express");
const router = express.Router();

const EntrepreneurController = require("../../controllers/api/Entrepreneur");

router.get("/findAll", EntrepreneurController.findAll);

router.put("/update", EntrepreneurController.updateEntrepreneur);

router.delete("/deleteByID", EntrepreneurController.deleteByID);

module.exports = router;
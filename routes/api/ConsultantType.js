const express = require("express");
const router = express.Router();

const ConsultantTypeController = require("../../controllers/api/ConsultantType");

router.post("/create", ConsultantTypeController.create);

router.get("/findAll", ConsultantTypeController.findAll);

router.delete("/deleteByID", ConsultantTypeController.deleteByID);

module.exports = router;
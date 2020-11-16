const express = require("express");
const router = express.Router();

const ConsultantController = require("../../controllers/api/Consultant");

router.get("/findAll", ConsultantController.findAll);

router.put("/update", ConsultantController.updateConsultant);

router.delete("/deleteByID", ConsultantController.deleteByID);

module.exports = router;
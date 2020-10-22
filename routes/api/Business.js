const express = require("express");
const router = express.Router();

const BusinessController = require("../../controllers/api/Business");

router.post("/create", BusinessController.create);

router.get("/test", BusinessController.test);
router.get("/findAll", BusinessController.findAll);

router.delete("/deleteByID", BusinessController.deleteByID);

module.exports = router;
const express = require("express");
const router = express.Router();

const BusinessController = require("../../controllers/api/Business");

router.get("/test", BusinessController.test);

module.exports = router;
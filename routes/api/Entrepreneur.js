const express = require("express");
const router = express.Router();

const EntrepreneurController = require("../../controllers/api/Entrepreneur");

router.post("/createBusiness", EntrepreneurController.createNewBusiness_Entrepreneur);

router.get("/findOneByUsername", EntrepreneurController.findOneEntrepreneurByUser);
router.get("/findAll", EntrepreneurController.findAll);
router.get("/findAllBusinesses", EntrepreneurController.findAllBusinesses);

router.put("/update", EntrepreneurController.updateEntrepreneur);

router.delete("/deleteOneBusiness", EntrepreneurController.deleteOneBusiness);
router.delete("/deleteByID", EntrepreneurController.deleteByID);

module.exports = router;
const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
  getOrgsForHospitalController,
  getInventoryHospitalController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//add inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//get all blood recors || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

//get hospital blood record
router.post(
  "/get-inventory-hospital",
  authMiddleware,
  getInventoryHospitalController
);

//get donar record
router.get("/get-donars", authMiddleware, getDonarsController);

//get hospital record
router.get("/get-hospitals", authMiddleware, getHospitalController);

//get organization record
router.get("/get-organizations", authMiddleware, getOrganizationController);

//get organization record for hospital
router.get(
  "/get-organizations-for-hospital",
  authMiddleware,
  getOrgsForHospitalController
);
module.exports = router;

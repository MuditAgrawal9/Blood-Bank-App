const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  createInventoryController,
  getInventoryController,
  getDonarsController,
  getHospitalController,
  getOrganizationController,
} = require("../controllers/inventoryController");

const router = express.Router();

//routes
//add inventory || POST
router.post("/create-inventory", authMiddleware, createInventoryController);

//get all blood recors || GET
router.get("/get-inventory", authMiddleware, getInventoryController);

//get donar record
router.get("/get-donars", authMiddleware, getDonarsController);

//get hospital record
router.get("/get-hospitals", authMiddleware, getHospitalController);

//get organization record
router.get("/get-organizations", authMiddleware, getOrganizationController);

module.exports = router;

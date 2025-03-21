const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getDonarListController,
  getOrganizationListController,
  getHospitalListController,
  deleteController,
} = require("../controllers/adminController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//routes
//get donar list
router.get(
  "/donar-list",
  authMiddleware,
  adminMiddleware,
  getDonarListController
);

//get hospital list
router.get(
  "/hospital-list",
  // authMiddleware,
  // adminMiddleware,
  getHospitalListController
);

//get organization list
router.get(
  "/org-list",
  // authMiddleware,
  // adminMiddleware,
  getOrganizationListController
);

router.delete(
  "/delete-record/:id",
  authMiddleware,
  adminMiddleware,
  deleteController
);

//export
module.exports = router;

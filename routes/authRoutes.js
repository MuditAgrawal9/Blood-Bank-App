const express = require("express");
const {
  registerController,
  loginController,
  currentUserController,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

//routes
//register || POST
router.post("/register", registerController);

//login || POST
router.post("/login", loginController);

//get current user || GET
router.get("/current-user", authMiddleware, currentUserController);

module.exports = router;
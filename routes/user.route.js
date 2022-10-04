const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.post("/register", userController.register);
router.put("/send-otp", userController.sendOtp);
router.post("/verify-otp", userController.verifyOtp);

module.exports = router;

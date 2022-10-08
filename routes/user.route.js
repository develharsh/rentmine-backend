const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/signin", userController.signin);
router.get(
  "/load-session",
  authMiddleware.isAuthenticated,
  userController.loadSession
);

module.exports = router;

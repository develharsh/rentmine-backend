const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");
const authMiddleware = require("../middlewares/auth");

router.post("/add", authMiddleware.isAuthenticated, propertyController.add);
router.get("/list", propertyController.list);

module.exports = router;

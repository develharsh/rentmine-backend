const express = require("express");
const router = express.Router();
const propertyController = require("../controllers/property.controller");

router.post("/add", propertyController.add);

module.exports = router;

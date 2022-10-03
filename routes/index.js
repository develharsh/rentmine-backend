const express = require("express");
const router = express.Router();
const propertyRoute = require("./property.route");
const generalRoute = require("./general.route");

// @Base Url
router.use((req, _, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

router.use("/property", propertyRoute);
router.use("/general", generalRoute);

module.exports = router;

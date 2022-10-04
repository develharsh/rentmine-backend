const express = require("express");
const router = express.Router();
const generalRoute = require("./general.route");
const propertyRoute = require("./property.route");
const userRoute = require("./user.route");

// @Base Url
router.use((req, _, next) => {
  req["currentUrl"] = `${req.protocol + "://" + req.headers.host}`;
  next();
});

router.use("/general", generalRoute);
router.use("/property", propertyRoute);
router.use("/user", userRoute);

module.exports = router;

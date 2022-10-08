const userModel = require("../models/user.model");
const utils = require("../utils");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      // console.log("Hi", token);
      token = token.replace("Bearer ", "");
      const decoded = await utils.getDecodedOAuthJwtGoogle(token);
      if (decoded.success == false)
        throw { message: "Session Expired, Please Log In Again." };
      const user = await userModel.findOne({ email: decoded.data.email });
      // console.log("Hi", user);
      if (!user) throw { message: "Session Expired, Please Log In Again." };
      req.user = user;
      next();
    } else throw { message: "You are not logged in, Please Log In." };
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

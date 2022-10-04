const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

module.exports.isAuthenticated = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.replace("Bearer ", "");
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await userModel.findById(decoded._id);
      if (!user)
        throw { message: "Session Expired, Please Log In Again.", code: 500 };
      req.user = user;
      next();
    } else
      throw { message: "Your are not logged in, Please Log In.", code: 500 };
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

const userModel = require("../models/user.model");
const otpModel = require("../models/otp.model");
// const validator = require("../utils/validator");
const utils = require("../utils");
// const jwt = require("jsonwebtoken");
const SendSMS = require("../services/sms");
const sendEmail = require("../utils/sendEmail");

module.exports.signin = async (req, res) => {
  try {
    if (!req.body.token) throw { message: "Token is missing", code: 400 };
    const decoded = await utils.getDecodedOAuthJwtGoogle(req.body.token);
    if (decoded.success == false)
      throw { message: "Something went wrong.", code: 400 };
    decoded.data["points"] = 50;
    let user = await userModel.findOne({ email: decoded.data.email });
    if (user) {
      user.name = decoded.data.name;
      user.picture = decoded.data.picture;
      user.save();
    } else {
      user = await userModel.create(decoded.data);
      sendEmail("userOnboard", {
        email: user.email,
        name: user.name,
      });
    }
    res.status(200).json({
      success: true,
      message: "User Signed In Successfully.",
      data: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};
module.exports.loadSession = (req, res) => {
  try {
    res.status(200).json({
      success: true,
      data: req.user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports.sendOtp = async (req, res) => {
  try {
    if (!req.body.phone) throw { message: "Phone is missing", code: 400 };
    if (!req.body.for) throw { message: "Reason is missing", code: 400 };
    const user = await userModel.findOne({ phone: req.body.phone });
    if (!user)
      throw { message: "No such user exists, Please Register.", code: 500 };
    const otp = await otpModel.findOne({ user: user._id });
    const otpValue = utils.generateOtp();
    otp[req.body.for]["value"] = otpValue;
    otp[req.body.for]["trialLeft"] = 2;
    ++otp[req.body.for]["totalOtps"];
    otp.save();
    //sendSms with Otp
    SendSMS(
      `Your OTP to ${req.body.for} on RentMine is ${otpValue} .`,
      `+91${req.body.phone}`
    );
    // console.log(otpValue);
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ success: false, message: error.message });
  }
};

module.exports.verifyOtp = async (req, res) => {
  try {
    if (!req.body.phone) throw { message: "Phone is missing", code: 400 };
    if (!req.body.for) throw { message: "Reason is missing", code: 400 };
    if (!req.body.value) throw { message: "OTP is missing", code: 400 };
    const user = await userModel.findOne({ phone: req.body.phone });
    if (!user)
      throw { message: "No such user exists, Please Register.", code: 500 };
    const otp = await otpModel.findOne({ user: user._id });
    if (otp[req.body.for]["trialLeft"] == 0)
      throw { message: "OTP Trial Expired, Resend OTP Again.", code: 500 };

    if (otp[req.body.for]["value"] == req.body.value) {
      otp[req.body.for]["trialLeft"] = 0; //disable last entered otp, to prevent reuse
      otp.save();
      //generate token and send it
      const token = jwt.sign(
        { _id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
        }
      );
      res.status(200).json({
        success: true,
        message: "OTP Verified Successfully.",
        token,
      });
    } else {
      --otp[req.body.for]["trialLeft"];
      otp.save();
      throw { message: "Wrong OTP, Please Try Again.", code: 500 };
    }
  } catch (error) {
    console.log(error);
    res.status(error.code).json({ success: false, message: error.message });
  }
};

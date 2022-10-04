const mongoose = require("mongoose");
const fields = {
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    unique: true,
  },
  login: {
    value: Number,
    trialLeft: Number,
    totalOtps: Number,
  },
  resetPassword: {
    value: Number,
    trialLeft: Number,
    totalOtps: Number,
  },
};

const otpSchema = new mongoose.Schema(fields, {
  timestamps: { createdAt: false, updatedAt: true },
});

module.exports = mongoose.models.Otp || mongoose.model("Otp", otpSchema);

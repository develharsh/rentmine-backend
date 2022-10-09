const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    email_verified: { type: Boolean, required: true },
    name: String,
    phone: String,
    picture: String,
    state: String,
    city: String,
    points: Number,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

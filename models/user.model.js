const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: { type: String, unique: true }, //required
    state: String,
    city: String,
    gender: String,
    age: String,
    registeredVia: String, //web, app
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);

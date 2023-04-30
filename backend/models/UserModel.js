const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  refreshToken: {
    type: String,
    default: "",
  },
  isAdminUser: { type: Boolean, default: false },
  organizationIds: { type: Array, default: [] },
  projectKeys: { type: Array, default: [] },
});

const User = model("User", userSchema, "Users");

// User.findOneAndUpdate({ user }, { refreshToken }, {upsert: true});
module.exports = User;

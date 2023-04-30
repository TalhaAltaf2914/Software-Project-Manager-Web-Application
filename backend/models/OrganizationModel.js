const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const organizationSchema = new Schema({
  name: String,
  country: String,
  projectKeys: { type: Array, default: [] },
  creatorId: mongoose.Types["ObjectId"],
});

const Organization = model("Organization", organizationSchema, "Organizations");

module.exports = Organization;

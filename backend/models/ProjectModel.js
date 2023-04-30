const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const projectSchema = new Schema({
  name: String,
  userIds: { type: Array, default: [] },
  taskIds: { type: Array, default: [] },
  backlogId: mongoose.Types["ObjectId"],
  organizationId: mongoose.Types["ObjectId"],
  createdDate: Date,
  creatorId: mongoose.Types["ObjectId"],
});

const Project = model("Project", projectSchema, "Projects");

module.exports = Project;

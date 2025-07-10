const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  status: { type: String, enum: ["Todo", "In Progress", "Done"], default: "Todo" },
  priority: { type: String, enum: ["Low", "Medium", "High"], default: "Medium" },
  updatedAt: { type: Date, default: Date.now }

});

module.exports = mongoose.model("Task", taskSchema);

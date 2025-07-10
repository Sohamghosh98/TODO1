const Task = require("../models/Task");
const ActionLog = require("../models/ActionLog");
const User = require("../models/User");

exports.getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo");
  res.json(tasks);
};

exports.createTask = async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  const log = new ActionLog({ action: "created", user: req.user.id, task: task._id });
  await log.save();
  global._io.emit("task-updated", task);
  global._io.emit("log-updated", log);
  res.status(201).json(task);
};

exports.updateTask = async (req, res) => {
  const taskId = req.params.id;
  const existingTask = await Task.findById(taskId);

  if (!existingTask) return res.sendStatus(404);

  if (req.body.updatedAt && new Date(req.body.updatedAt) < new Date(existingTask.updatedAt)) {
    return res.status(409).json({
      conflict: true,
      serverVersion: existingTask,
      clientVersion: req.body
    });
  }

  const updated = await Task.findByIdAndUpdate(taskId, { ...req.body, updatedAt: new Date() }, { new: true });

  const log = new ActionLog({ action: "updated", user: req.user.id, task: updated._id });
  await log.save();
  global._io.emit("task-updated", updated);
  global._io.emit("log-updated", log);

  res.json(updated);
};


exports.deleteTask = async (req, res) => {
  const task = await Task.findByIdAndDelete(req.params.id);
  const log = new ActionLog({ action: "deleted", user: req.user.id, task: task._id });
  await log.save();
  global._io.emit("task-updated", task);
  global._io.emit("log-updated", log);
  res.sendStatus(204);
};

exports.smartAssign = async (req, res) => {
  const users = await User.find();
  const tasks = await Task.find({ status: { $ne: "Done" } });
  const counts = {};
  users.forEach(user => counts[user._id] = 0);
  tasks.forEach(task => {
    if (task.assignedTo) counts[task.assignedTo]++;
  });
  const leastBusy = Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b);
  const task = await Task.findByIdAndUpdate(req.params.id, { assignedTo: leastBusy }, { new: true });
  const log = new ActionLog({ action: "smart-assigned", user: req.user.id, task: task._id });
  await log.save();
  global._io.emit("task-updated", task);
  global._io.emit("log-updated", log);
  res.json(task);
};

exports.getLogs = async (req, res) => {
  const logs = await ActionLog.find().sort({ timestamp: -1 }).limit(20).populate("user").populate("task");
  res.json(logs);
};

const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  smartAssign,
  getLogs
} = require("../controllers/taskController");

router.get("/", auth, getTasks);
router.post("/", auth, createTask);
router.put("/:id", auth, updateTask);
router.delete("/:id", auth, deleteTask);
router.put("/smart-assign/:id", auth, smartAssign);
router.get("/logs", auth, getLogs);

module.exports = router;

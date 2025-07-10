const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
require("dotenv").config();

const userRoutes = require("./routes/users");
const taskRoutes = require("./routes/tasks");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Add logging and error handling
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ Connected to MongoDB");
    server.listen(process.env.PORT, () => {
      console.log(`🚀 Server running at http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

io.on("connection", (socket) => {
  socket.on("task-updated", (task) => {
    socket.broadcast.emit("task-updated", task);
  });
  socket.on("log-updated", (log) => {
    socket.broadcast.emit("log-updated", log);
  });
});

global._io = io;

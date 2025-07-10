import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io(process.env.REACT_APP_API);

export default function Board({ user }) {
  const [tasks, setTasks] = useState([]);
  const [logs, setLogs] = useState([]);

  const getTasks = async () => {
    const res = await axios.get("/api/tasks");
    setTasks(res.data);
  };

  const getLogs = async () => {
    const res = await axios.get("/api/tasks/logs");
    setLogs(res.data);
  };

  useEffect(() => {
    getTasks();
    getLogs();
    socket.on("task-updated", getTasks);
    socket.on("log-updated", getLogs);
  }, []);

  const handleDrag = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDrop = async (e, status) => {
    const id = e.dataTransfer.getData("id");
    const task = tasks.find(t => t._id === id);
    if (!task) return;
    await axios.put(`/api/tasks/${id}`, { ...task, status });
  };

  const smartAssign = async (id) => {
    await axios.put(`/api/tasks/smart-assign/${id}`);
  };

  const renderColumn = (title) => (
    <div className="column" onDrop={(e) => handleDrop(e, title)} onDragOver={(e) => e.preventDefault()}>
      <h3>{title}</h3>
      {tasks.filter(t => t.status === title).map(task => (
        <div key={task._id} draggable onDragStart={(e) => handleDrag(e, task._id)} className="task-card">
          <h4>{task.title}</h4>
          <p>{task.description}</p>
          <p>Assigned: {task.assignedTo?.name || "None"}</p>
          <button onClick={() => smartAssign(task._id)}>Smart Assign</button>
        </div>
      ))}
    </div>
  );

  return (
    <div className="board">
      {renderColumn("Todo")}
      {renderColumn("In Progress")}
      {renderColumn("Done")}
      <div className="log-panel">
        <h3>Activity Log</h3>
        <ul>
          {logs.map((log, idx) => (
            <li key={idx}>{log.user?.name} {log.action} "{log.task?.title}"</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

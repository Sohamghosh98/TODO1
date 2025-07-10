# TODO1
# Collaborative Real-Time To-Do Board (MERN Stack)

## 🚀 Project Overview
A Trello-like real-time collaborative to-do board where users can:
- Register and log in securely
- Create, assign, and update tasks
- Drag-and-drop tasks across Todo, In Progress, and Done columns
- See real-time updates instantly
- View a live activity log

Built with **MongoDB, Express, React, Node.js, and Socket.IO**.

---

## 🛠 Tech Stack

- **Frontend:** React (custom CSS, no Bootstrap/Tailwind)
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **Authentication:** JWT + bcryptjs
- **Real-Time Sync:** Socket.IO

---

## 🔑 Features

### ✔️ Core
- Login/Register with JWT
- Smart Assign: Assign task to user with fewest tasks
- Drag-and-drop Kanban board (Todo, In Progress, Done)
- Live Activity Log Panel (last 20 actions)
- Conflict Handling (merge/overwrite prompt-ready)

### 🎨 UI/UX
- Custom styling, fully responsive
- No third-party UI kits
- Smooth drag animations

---

## 🔐 Setup & Installation

### Backend
```bash
cd backend
npm install
node server.js

---

## 📄 `Logic_Document.md`

```markdown
# Logic Documentation – Collaborative Real-Time To-Do Board

## Smart Assign Logic
- On clicking “Smart Assign,” the backend fetches all users and all incomplete tasks.
- It counts how many tasks are currently assigned to each user.
- The user with the fewest incomplete tasks is selected.
- The task is reassigned to that user.
- The update is broadcast via Socket.IO to all clients.

### Key Function: `smartAssign` in taskController.js

```js
const users = await User.find();
const tasks = await Task.find({ status: { $ne: "Done" } });
const counts = {};
users.forEach(user => counts[user._id] = 0);
tasks.forEach(task => {
  if (task.assignedTo) counts[task.assignedTo]++;
});
const leastBusy = Object.keys(counts).reduce((a, b) => counts[a] < counts[b] ? a : b);

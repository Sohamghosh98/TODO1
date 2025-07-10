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

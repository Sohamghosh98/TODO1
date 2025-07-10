import React, { useState } from "react";
import Login from "./pages/Login";
import Board from "./pages/Board";

export default function App() {
  const [user, setUser] = useState(null);
  return user ? <Board user={user} /> : <Login onLogin={setUser} />;
}

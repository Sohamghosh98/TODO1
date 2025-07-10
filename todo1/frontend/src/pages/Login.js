import React, { useState } from "react";
import axios from "axios";

export default function Login({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [register, setRegister] = useState(false);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = register ? { ...form, name } : form;
    const url = `${process.env.REACT_APP_API}/api/users/${register ? "register" : "login"}`;
    const res = await axios.post(url, data);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + res.data.token;
      axios.defaults.baseURL = process.env.REACT_APP_API;
      onLogin(res.data.user);
    }
  };

  return (
    <div className="login-page">
      <form onSubmit={handleSubmit}>
        {register && <input name="name" placeholder="Name" onChange={e => setName(e.target.value)} />}
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button type="submit">{register ? "Register" : "Login"}</button>
        <p onClick={() => setRegister(!register)} style={{ cursor: "pointer" }}>
          {register ? "Already have an account?" : "Create an account"}
        </p>
      </form>
    </div>
  );
}

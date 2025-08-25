import React, { useState } from "react";

export default function Register({ onSwitchLogin }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Register failed");
      setMsg("Registered. You can login now.");
      setTimeout(()=> onSwitchLogin(), 1200);
    } catch (e) {
      setMsg(e.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Register</h3>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Register</button>
      {msg && <small style={{display:'block', marginTop:8}}>{msg}</small>}
    </form>
  );
}

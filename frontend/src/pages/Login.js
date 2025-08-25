import React, { useState } from "react";

export default function Login({ onLogin, onSwitchRegister }){
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setErr("");
    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Login failed");
      onLogin(data.access_token);
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
      <input placeholder="Username" value={username} onChange={e=>setUsername(e.target.value)} required />
      <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      {err && <small className="err">{err}</small>}
      <div style={{marginTop:12}}>No account? <a href="#" onClick={(e)=>{e.preventDefault(); onSwitchRegister()}}>Register</a></div>
    </form>
  );
}

import React, { useState, useEffect } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";
import Dashboard from "./pages/Dashboard";

export default function App(){
  const [view, setView] = useState("login");
  const [token, setToken] = useState(localStorage.getItem("access_token"));

  useEffect(()=>{
    if (token) setView("main");
    else setView("login");
  },[token]);

  const handleLogin = (access_token) => {
    localStorage.setItem("access_token", access_token);
    setToken(access_token);
  };
  const handleLogout = () => {
    localStorage.removeItem("access_token");
    setToken(null);
    setView("login");
  };

  return (
    <div className="container">
      <nav>
        <div><strong>AI Content Explorer</strong></div>
        <div>
          <button onClick={()=>setView("main")}>Main</button>
          <button onClick={()=>setView("dashboard")}>Dashboard</button>
          {token ? <button onClick={handleLogout} className="secondary">Logout</button> : <button onClick={()=>setView("login")}>Login</button>}
        </div>
      </nav>

      <div className="card">
        {view === "login" && <Login onLogin={handleLogin} onSwitchRegister={() => setView("register")} />}
        {view === "register" && <Register onSwitchLogin={() => setView("login")} />}
        {view === "main" && <Main />}
        {view === "dashboard" && <Dashboard />}
      </div>
    </div>
  );
}

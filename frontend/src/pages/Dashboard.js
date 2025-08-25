import React, { useEffect, useState } from "react";

export default function Dashboard(){
  const [items, setItems] = useState([]);
  const token = localStorage.getItem("access_token");

  const fetchItems = async () => {
    const res = await fetch("http://localhost:8000/dashboard", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const data = await res.json();
    setItems(data);
  };

  useEffect(()=>{ fetchItems() }, []);

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await fetch(`http://localhost:8000/dashboard/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    });
    fetchItems();
  };

  return (
    <div>
      <h3>Your Dashboard</h3>
      <div className="grid">
        {items.map(it => (
          <div key={it.id} className="item">
            <div style={{fontSize:12, color:'#666'}}>{new Date(it.content.timestamp).toLocaleString()}</div>
            {it.type === "search" ? (
              <>
                <div style={{fontWeight:600}}>Query: {it.content.query}</div>
                <div>{it.content.summary}</div>
              </>
            ) : (
              <>
                <div style={{fontWeight:600}}>Prompt: {it.content.prompt}</div>
                <img src={it.content.image_url} alt="gen" style={{maxWidth:'100%'}}/>
              </>
            )}
            <div style={{marginTop:8}}>
              <button onClick={()=>deleteItem(it.id)} className="secondary">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

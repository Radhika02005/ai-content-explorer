import React, { useState } from "react";

export default function Main(){
  const [query, setQuery] = useState("");
  const [searchRes, setSearchRes] = useState("");
  const [prompt, setPrompt] = useState("");
  const [imageRes, setImageRes] = useState("");
  const token = localStorage.getItem("access_token");

  const post = async (path, body) => {
    const res = await fetch(`http://localhost:8000${path}`, {
      method: "POST",
      headers: { "Content-Type":"application/json", "Authorization": `Bearer ${token}` },
      body: JSON.stringify(body)
    });
    return res;
  };

  const doSearch = async () => {
    setSearchRes("Loading...");
    try {
      const res = await post("/search", { query });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Search failed");
      setSearchRes(data.summary);
    } catch(e) {
      setSearchRes(e.message);
    }
  };

  const genImage = async () => {
    setImageRes("Loading...");
    try {
      const res = await post("/image", { query: prompt });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || "Image failed");
      setImageRes(data.image_url);
    } catch(e) {
      setImageRes(e.message);
    }
  };

  return (
    <div>
      <h3>Web Search</h3>
      <input placeholder="e.g. What is quantum computing?" value={query} onChange={e=>setQuery(e.target.value)} />
      <button onClick={doSearch}>Search</button>
      {searchRes && <div style={{marginTop:8}}>{searchRes}</div>}

      <h3 style={{marginTop:16}}>Image Generation</h3>
      <input placeholder="e.g. astronaut on a horse" value={prompt} onChange={e=>setPrompt(e.target.value)} />
      <button onClick={genImage}>Generate</button>
      {imageRes && <div style={{marginTop:8}}><img src={imageRes} alt="generated" style={{maxWidth:400}}/></div>}
    </div>
  );
}

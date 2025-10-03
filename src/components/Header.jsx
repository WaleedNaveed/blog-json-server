import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "1rem 2rem", borderBottom: "1px solid #eee"
    }}>
      <h1 style={{ margin: 0, fontSize: "1.25rem" }}>
        <Link to="/" style={{ textDecoration: "none", color: "#111" }}>JSON Server Blog Demo</Link>
      </h1>
      <nav>
        <Link to="/" style={{ marginRight: 12 }}>Home</Link>
        <Link to="/new">New Post</Link>
      </nav>
    </header>
  );
}

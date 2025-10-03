import React from "react";

export default function ErrorBox({ message }) {
  if (!message) return null;
  return (
    <div style={{
      border: "1px solid #f5c6cb",
      background: "#f8d7da",
      color: "#721c24",
      padding: "0.75rem",
      borderRadius: 4,
      margin: "0.5rem 0"
    }}>
      {message}
    </div>
  );
}

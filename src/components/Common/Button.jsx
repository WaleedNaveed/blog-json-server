import React from "react";

export default function Button({ children, onClick, type = "button", disabled = false, style }) {
  const base = {
    padding: "0.5rem 1rem",
    borderRadius: 6,
    border: "none",
    background: "#0b5fff",
    color: "#fff",
    cursor: disabled ? "not-allowed" : "pointer"
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled} style={{ ...base, ...(style || {}) }}>
      {children}
    </button>
  );
}

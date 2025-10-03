import React from "react";

export default function Pagination({ page, totalPages, onPage }) {
  if (totalPages <= 1) return null;
  const items = [];
  for (let i = 1; i <= totalPages; i++) items.push(i);
  return (
    <div style={{ marginTop: 16 }}>
      {items.map((p) => (
        <button
          key={p}
          onClick={() => onPage(p)}
          style={{
            marginRight: 8,
            padding: "0.4rem 0.6rem",
            background: p === page ? "#0b5fff" : "#f0f0f0",
            color: p === page ? "#fff" : "#111",
            border: "none",
            borderRadius: 4,
            cursor: "pointer"
          }}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

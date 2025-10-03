import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Common/Button";
import ErrorBox from "../components/Common/ErrorBox";

export default function NewPostPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    const form = e.target;
    const title = form.title.value.trim();
    const author = form.author.value.trim() || "Anonymous";
    const body = form.body.value.trim();

    if (!title || !body) {
      setError("Title and body are required");
      return;
    }

    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/posts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, body, date: new Date().toISOString() })
      });
      if (!res.ok) throw new Error("Failed to create post");
      const created = await res.json();
      navigate(`/posts/${created.id}`);
    } catch (err) {
      setError(err.message || "Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: "1.5rem 2rem" }}>
      <h2>Create New Post</h2>
      <ErrorBox message={error} />
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input name="title" placeholder="Title" style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input name="author" placeholder="Author" style={{ width: "100%", padding: 8 }} />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea name="body" placeholder="Body" style={{ width: "100%", padding: 8, minHeight: 160 }} />
        </div>
        <Button type="submit" disabled={loading}>{loading ? "Saving…" : "Publish"}</Button>
      </form>
    </main>
  );
}

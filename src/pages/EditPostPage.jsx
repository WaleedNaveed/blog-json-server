import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Common/Button";
import ErrorBox from "../components/Common/ErrorBox";

export default function EditPostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({ title: "", author: "", body: "" });

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
        const res = await fetch(`${base}/posts/${id}`);
        if (!res.ok) throw new Error("Failed to load post");
        const data = await res.json();
        setPost(data);
      } catch (err) {
        setError(err.message || "Failed to load post");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/posts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...post, date: new Date().toISOString() })
      });
      if (!res.ok) throw new Error("Failed to update post");
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <main style={{ padding: "1.5rem 2rem" }}>
      <h2>Edit Post</h2>
      <ErrorBox message={error} />
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 8 }}>
          <input
            name="title"
            value={post.title}
            onChange={(e) => setPost({ ...post, title: e.target.value })}
            placeholder="Title"
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <input
            name="author"
            value={post.author}
            onChange={(e) => setPost({ ...post, author: e.target.value })}
            placeholder="Author"
            style={{ width: "100%", padding: 8 }}
          />
        </div>
        <div style={{ marginBottom: 8 }}>
          <textarea
            name="body"
            value={post.body}
            onChange={(e) => setPost({ ...post, body: e.target.value })}
            placeholder="Body"
            style={{ width: "100%", padding: 8, minHeight: 160 }}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving…" : "Update Post"}
        </Button>
      </form>
    </main>
  );
}

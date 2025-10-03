import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../components/Common/Loader";
import ErrorBox from "../components/Common/ErrorBox";
import useComments from "../hooks/useComments";
import { formatDate } from "../utils/format";
import Button from "../components/Common/Button";

export default function PostPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { comments, loading: commentsLoading, error: commentsError, create } = useComments(id);

  useEffect(() => {
    async function load() {
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
    load();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/posts/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      navigate("/");
    } catch (err) {
      alert("Failed to delete post");
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    const form = e.target;
    const author = form.author.value.trim();
    const body = form.body.value.trim();
    if (!author || !body) return;
    try {
      await create({ author, body });
      form.reset();
    } catch (err) {
      alert("Failed to add comment");
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorBox message={error} />;

  if (!post) return <p>Post not found</p>;

  return (
    <main style={{ padding: "1.5rem 2rem" }}>
      <h2>{post.title}</h2>
      <div style={{ color: "#666" }}>{post.author} • {formatDate(post.date)}</div>
      <p style={{ marginTop: 16 }}>{post.body}</p>

      <div style={{ marginTop: 20 }}>
        <Button onClick={() => navigate(`/posts/${id}/edit`)} style={{ marginRight: 8 }}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </div>

      <section style={{ marginTop: 32 }}>
        <h3>Comments</h3>
        {commentsLoading && <Loader />}
        <ErrorBox message={commentsError} />
        {comments && comments.length === 0 && <p>No comments yet.</p>}
        <ul>
          {comments.map((c) => (
            <li key={c.id} style={{ padding: "0.5rem 0", borderBottom: "1px solid #eee" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 600 }}>{c.author} <span style={{ fontWeight: 400, color: "#666" }}>• {formatDate(c.date)}</span></div>
              <div>{c.body}</div>
            </li>
          ))}
        </ul>

        <form onSubmit={handleAddComment} style={{ marginTop: 12 }}>
          <div style={{ marginBottom: 8 }}>
            <input name="author" placeholder="Your name" style={{ width: "100%", padding: 8 }} />
          </div>
          <div style={{ marginBottom: 8 }}>
            <textarea name="body" placeholder="Write a comment" style={{ width: "100%", padding: 8, minHeight: 80 }} />
          </div>
          <Button type="submit">Add Comment</Button>
        </form>
      </section>
    </main>
  );
}

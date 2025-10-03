import { useState, useEffect } from "react";

export default function useComments(postId) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setError(null);
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const res = await fetch(`${base}/comments?postId=${postId}`);
      if (!res.ok) throw new Error("Failed to load comments");
      const data = await res.json();
      setComments(data);
    } catch (err) {
      setError(err.message || "Failed to load comments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!postId) return;
    load();
  }, [postId]);

  const create = async (comment) => {
    const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
    const res = await fetch(`${base}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...comment, postId: Number(postId), date: new Date().toISOString() })
    });
    if (!res.ok) throw new Error("Failed to add comment");
    const created = await res.json();
    setComments((c) => [...c, created]);
    return created;
  };

  return { comments, loading, error, refresh: load, create };
}

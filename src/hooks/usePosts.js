import { useState, useEffect } from "react";

const PAGE_SIZE = 5;

export default function usePosts(initialPage = 1) {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPage = async (p = 1) => {
    try {
      setLoading(true);
      setError(null);
      const base = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const params = `?_page=${p}&_limit=${PAGE_SIZE}&_sort=date&_order=desc`;
      const res = await fetch(`${base}/posts${params}`);
      if (!res.ok) throw new Error("Failed to fetch posts");
      const data = await res.json();
      const totalCount = res.headers.get("X-Total-Count") || data.length;
      setTotalPages(Math.max(1, Math.ceil(totalCount / PAGE_SIZE)));
      setPosts(data);
      setPage(p);
    } catch (err) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(page);
  }, []);

  return {
    posts,
    page,
    totalPages,
    loading,
    error,
    goToPage: fetchPage,
    refresh: () => fetchPage(page)
  };
}

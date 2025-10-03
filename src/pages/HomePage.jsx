import React from "react";
import { Link } from "react-router-dom";
import usePosts from "../hooks/usePosts";
import Loader from "../components/Common/Loader";
import ErrorBox from "../components/Common/ErrorBox";
import Pagination from "../components/Pagination";
import { formatDate } from "../utils/format";

export default function HomePage() {
  const { posts, page, totalPages, loading, error, goToPage } = usePosts(1);

  return (
    <main style={{ padding: "1.5rem 2rem" }}>
      <h2>Latest Posts</h2>
      {loading && <Loader />}
      <ErrorBox message={error} />
      {!loading && posts.length === 0 && <p>No posts available.</p>}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {posts.map((p) => (
          <li key={p.id} style={{ padding: "0.75rem 0", borderBottom: "1px solid #eee" }}>
            <Link to={`/posts/${p.id}`} style={{ textDecoration: "none", color: "#0b5fff" }}>
              <h3 style={{ margin: 0 }}>{p.title}</h3>
            </Link>
            <div style={{ fontSize: "0.85rem", color: "#555" }}>
              {p.author} • {formatDate(p.date)}
            </div>
            <p style={{ marginTop: "0.4rem" }}>{p.body.slice(0, 200)}{p.body.length > 200 ? "…" : ""}</p>
          </li>
        ))}
      </ul>

      <Pagination page={page} totalPages={totalPages} onPage={goToPage} />
    </main>
  );
}

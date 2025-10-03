const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:3000";

async function request(url, options = {}) {
  const res = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    ...options
  });

  const contentType = res.headers.get("content-type");
  if (!res.ok) {
    let errorBody = null;
    try {
      if (contentType && contentType.includes("application/json")) {
        errorBody = await res.json();
      } else {
        errorBody = await res.text();
      }
    } catch {
    }
    const message =
      (errorBody && errorBody.message) ||
      (typeof errorBody === "string" ? errorBody : null) ||
      res.statusText ||
      "API request failed";
    const err = new Error(message);
    err.status = res.status;
    err.body = errorBody;
    throw err;
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  }
  return null;
}

export default {
  get: (url) => request(url, { method: "GET" }),
  post: (url, body) => request(url, { method: "POST", body: JSON.stringify(body) }),
  put: (url, body) => request(url, { method: "PUT", body: JSON.stringify(body) }),
  patch: (url, body) => request(url, { method: "PATCH", body: JSON.stringify(body) }),
  del: (url) => request(url, { method: "DELETE" })
};

import apiClient from "./apiClient";

const POSTS = "/posts";
const COMMENTS = "/comments";

export const getPosts = (params = "") => {
  return apiClient.get(`${POSTS}${params}`);
};

export const getPost = (id) => {
  return apiClient.get(`${POSTS}/${id}`);
};

export const createPost = (post) => {
  const payload = { ...post, date: new Date().toISOString() };
  return apiClient.post(POSTS, payload);
};

export const updatePost = (id, post) => {
  return apiClient.put(`${POSTS}/${id}`, post);
};

export const deletePost = (id) => {
  return apiClient.del(`${POSTS}/${id}`);
};

export const getCommentsByPost = (postId) => {
  return apiClient.get(`${COMMENTS}?postId=${postId}`);
};

export const addComment = (comment) => {
  const payload = { ...comment, date: new Date().toISOString() };
  return apiClient.post(COMMENTS, payload);
};

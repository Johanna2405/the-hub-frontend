import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Send Auth-Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Create comment
export const createComment = async (commentData) => {
  try {
    const response = await API.post("/comments", commentData);
    return response.data;
  } catch (error) {
    console.error("Error creating comment:", error);
    throw error.response?.data?.message || "Failed to create comment";
  }
};

// Get comments for a post
export const getCommentsByPost = async (postId) => {
  try {
    const url = `/comments/${postId}`;
    console.log("[GET Comments] Requesting:", `${BACKEND_URL}/api${url}`);
    const response = await API.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    throw error.response?.data?.message || "Failed to fetch comments";
  }
};

// Update comment
export const updateComment = async (commentId, updatedContent) => {
  try {
    const response = await API.put(`/comments/${commentId}`, updatedContent);
    return response.data;
  } catch (error) {
    console.error("Error updating comment:", error);
    throw error.response?.data?.message || "Failed to update comment";
  }
};

// Delete comment
export const deleteComment = async (commentId) => {
  try {
    const response = await API.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting comment:", error);
    throw error.response?.data?.message || "Failed to delete comment";
  }
};

import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Automatically attach token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// GET: Fetch all posts
export const fetchPosts = async () => {
  const response = await API.get("/posts");
  return response.data;
};

// GET: Fetch post by ID
export const fetchPostById = async (id) => {
  const response = await API.get(`/posts/${id}`);
  return response.data;
};

// GET: Fetch posts by user ID
export const fetchUserPosts = async (userId) => {
  try {
    const response = await API.get(`/posts?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user posts:", error);
    throw error;
  }
};

// POST: Create a new post
export const createPost = async (postData) => {
  const response = await API.post("/posts", postData);
  return response.data;
};

// PUT: Update post by ID
export const updatePost = async (id, updatedData) => {
  const response = await API.put(`/posts/${id}`, updatedData);
  return response.data;
};

// DELETE: Delete post by ID
export const deletePost = async (id) => {
  const response = await API.delete(`/posts/${id}`);
  return response.data;
};

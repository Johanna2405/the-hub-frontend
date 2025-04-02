// utils/postsAPI.js
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const POSTS_API = `${BACKEND_URL}/api/posts`;

// GET: Alle Posts holen
export const fetchPosts = async () => {
  const response = await axios.get(POSTS_API);
  return response.data;
};

// GET: Einzelnen Post nach ID holen
export const fetchPostById = async (id) => {
  const response = await axios.get(`${POSTS_API}/${id}`);
  return response.data;
};

// POST: Neuen Post erstellen
export const createPost = async (postData) => {
  const response = await axios.post(POSTS_API, postData);
  return response.data;
};

// PUT: Vorhandenen Post aktualisieren
export const updatePost = async (id, updatedData) => {
  const response = await axios.put(`${POSTS_API}/${id}`, updatedData);
  return response.data;
};

// DELETE: Post löschen
export const deletePost = async (id) => {
  const response = await axios.delete(`${POSTS_API}/${id}`);
  return response.data;
};

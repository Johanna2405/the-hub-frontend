import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const POSTS_API = `${BACKEND_URL}/api/posts`;

// GET: Fetch all posts
export const fetchPosts = async () => {
  const response = await axios.get(POSTS_API);
  return response.data;
};

// GET: Fetch posts by ID
export const fetchPostById = async (id) => {
  const response = await axios.get(`${POSTS_API}/${id}`);
  return response.data;
};

// GET: Fetch posts by user ID
export const fetchUserPosts = async (userId) => {
  try {
    const response = await axios.get(`${BASE_URL}?userId=${userId}`);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching user posts:", error);
    throw error;
  }
};

// POST: Create a new post
export const createPost = async (postData) => {
  const response = await axios.post(POSTS_API, postData);
  return response.data;
};

// PUT: Update post by ID
export const updatePost = async (id, updatedData) => {
  const response = await axios.put(`${POSTS_API}/${id}`, updatedData);
  return response.data;
};

// DELETE: Delete post by ID
export const deletePost = async (id) => {
  const response = await axios.delete(`${POSTS_API}/${id}`);
  return response.data;
};

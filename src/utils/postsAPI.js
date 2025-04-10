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
    console.error("Error fetching user posts:", error);
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

// GET: Fetch posts for a specific community
export const fetchCommunityPosts = async (communityId) => {
  try {
    const response = await API.get(`/communities/${communityId}/posts`);
    return response.data;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    throw error;
  }
};

// POST: Create a post in a specific community
export const createCommunityPost = async (communityId, postData) => {
  try {
    const response = await API.post(
      `/communities/${communityId}/posts`,
      postData
    );
    return response.data;
  } catch (error) {
    console.error("Error creating community post:", error);
    throw error;
  }
};

// PUT: Update a post in a specific community
export const updateCommunityPost = async (communityId, postId, updatedData) => {
  try {
    const response = await API.put(
      `/communities/${communityId}/posts/${postId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.error("Error updating community post:", error);
    throw error;
  }
};

// DELETE: Delete a community post
export const deleteCommunityPost = async (communityId, postId) => {
  try {
    const response = await API.delete(
      `/communities/${communityId}/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting community post:", error);
    throw error;
  }
};

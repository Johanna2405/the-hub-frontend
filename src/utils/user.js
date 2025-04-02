import axios from "axios";

// Define the base URL for API requests
const API = axios.create({
  baseURL: "/api", // Adjust based on backend
});

// Fetch the current user
export const fetchUser = async () => {
  try {
    const response = await API.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

// Login function
export const userLogin = async (email, password) => {
  try {
    const response = await API.post("/auth/login", { email, password });
    localStorage.setItem("token", response.data.token); // Store token
    return response.data.user;
  } catch (error) {
    console.error("Login failed:", error);
    throw error.response?.data?.message || "Login failed";
  }
};

// Logout function
export const userLogout = () => {
  localStorage.removeItem("token");
};

// Update user profile
export const updateUser = async (userId, updateData) => {
  try {
    const response = await API.put(`/users/${userId}`, updateData);
    return response.data;
  } catch (error) {
    console.error("Update failed:", error);
    throw error;
  }
};

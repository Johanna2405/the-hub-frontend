import axios from "axios";

// Define the base URL for API requests
const API = axios.create({
  baseURL: "/api", // Adjust based on backend
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Login function: POST /login
export const userLogin = async (email, password) => {
  try {
    const response = await API.post("/login", { email, password });

    // Save user & token
    localStorage.setItem("token", response.data.token);
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

// Create a new user (Sign Up)
export const createUser = async ({ username, email, password }) => {
  try {
    const response = await API.post("/users", {
      username,
      email,
      password,
      profile_picture: null, // Assuming no profile picture for now
      community_id: 1, // Assuming a default community ID
    });
    return response.data;
  } catch (error) {
    console.error("Signup failed:", error);
    throw error.response?.data?.message || "Signup failed";
  }
};

// Fetch the current user: GET /login/me
export const fetchUser = async () => {
  try {
    const response = await API.get("/login/me");
    console.log("fetchUser response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
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

// Update username
export const changeUsername = async (userId, username) => {
  return await updateUser(userId, { username });
};

// Update password
export const changePassword = async (userId, password) => {
  return await updateUser(userId, { password });
};

// Update status
export const updateStatus = async (userId, status) => {
  return await updateUser(userId, { status });
};

// Update profile picture
export const updateProfilePicture = async (userId, file) => {
  const formData = new FormData();
  formData.append("profile_picture", file);

  const response = await API.put(`/users/${userId}/profile-picture`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

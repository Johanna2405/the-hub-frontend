import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});

// Placeholder function
export const fetchJoinedCommunities = async () => {
  const response = await API.get("/communities/my");

  if (!response.ok) {
    throw new Error("Failed to fetch communities");
  }

  return response.data;
};

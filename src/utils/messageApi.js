import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
const MESSAGES_API = `${BACKEND_URL}/api/messages`;

export const fetchAllMessages = async () => {
  try {
    const response = await axios.get(MESSAGES_API);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error("Failed to fetch messages. Please try again later.");
  }
};

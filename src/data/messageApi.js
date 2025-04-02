export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API_MESSAGES_URL = `${BACKEND_URL}/messages`;

export const fetchAllMessages = async () => {
  try {
    const response = await fetch(API_MESSAGES_URL);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    console.log("Fetched messages:", data);
    return data;
  } catch (error) {
    console.error("Failed to fetch messages:", error.message);
    throw new Error("Failed to fetch messages. Please try again later.");
  }
};

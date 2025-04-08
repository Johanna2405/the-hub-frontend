import axios from "axios";
import { io } from "socket.io-client";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const API = axios.create({
  baseURL: `${BACKEND_URL}/api`,
});
const socket = io("http://localhost:8080");

export const fetchAllMessages = async () => {
  try {
    const response = await API.get("/messages");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    throw new Error("Failed to fetch messages. Please try again later.");
  }
};

export const setupChatListener = (setChat) => {
  socket.on("receive_message", (msg) => {
    setChat((prev) => [...prev, msg]);
  });

  return () => {
    socket.off("receive_message");
  };
};

export const sendMessage = (messageData) => {
  socket.emit("send_message", messageData);
};

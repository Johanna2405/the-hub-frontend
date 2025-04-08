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

export const setupChatListener = (setChat, setTypingUser) => {
  socket.on("receive_message", (msg) => {
    console.log("Received message:", msg);
    setChat((prev) => [...prev, msg]);
  });

  socket.on("display_typing", (data) => {
    console.log(`${data.username} is typing...`);
    setTypingUser(data.username);

    // Optionally clear after a few seconds
    setTimeout(() => {
      setTypingUser(null);
    }, 2000);
  });

  return () => {
    socket.off("receive_message");
    socket.off("display_typing");
  };
};

export const sendMessage = (messageData) => {
  console.log("Sending message:", messageData);
  socket.emit("send_message", messageData);
};

export const emitTyping = (user) => {
  socket.emit("user_typing", {
    user_id: user.id,
    username: user.username,
  });
};

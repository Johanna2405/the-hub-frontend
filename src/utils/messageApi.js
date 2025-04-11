import { io } from "socket.io-client";
const socket = io(import.meta.env.VITE_BACKEND_URL);

export const setupChatListener = (setChat, setTypingUser, setOnlineUserIds) => {
  socket.off("receive_message");
  socket.off("display_typing");
  socket.off("update_online_users");

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

  socket.on("update_online_users", (onlineUserIds) => {
    console.log("Online user IDs from server:", onlineUserIds);
    setOnlineUserIds(onlineUserIds);
  });

  return () => {
    socket.off("receive_message");
    socket.off("display_typing");
    socket.off("update_online_users");
  };
};

export const sendMessage = (messageData) => {
  console.log("Sending message:", messageData);
  socket.emit("send_message", messageData);
};

export const emitTyping = (user) => {
  socket.emit("user_typing", {
    user_id: user.id,
    community_id: user.community_id,
    username: user.username,
  });
};

export const connectUser = (user) => {
  if (!user?.id) return;

  if (socket.connected) {
    console.log("Socket is already connected, emitting user_connected");
    socket.emit("user_connected", user);
  } else {
    socket.on("connect", () => {
      console.log("Socket just connected, emitting user_connected");
      socket.emit("user_connected", user);
    });
  }
};

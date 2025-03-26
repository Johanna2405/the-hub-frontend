import React from "react";

const MessageBubble = ({ message }) => {
    const isOwn = message.sender === "me";
    return (
        <div className={`chat ${isOwn ? "chat-end" : "chat-start"} my-2`}>
            <div
                className={`chat-bubble ${
                    isOwn ? "chat-bubble-success" : "chat-bubble-info"
                }`}
            >
                {message.text}
            </div>
        </div>
    );
};

export default MessageBubble;

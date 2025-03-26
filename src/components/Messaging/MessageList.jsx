import React from "react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages }) => {
    return (
        <div>
            {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg} />
            ))}
        </div>
    );
};

export default MessageList;

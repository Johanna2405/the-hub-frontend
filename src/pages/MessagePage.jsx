import React from "react";
import MessageList from "../components/Messaging/MessageList";
import MessageInput from "../components/Messaging/MessageInput";
import { useState } from "react";

const MessagePage = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: "Lorem ipsum dolor sit amet...", sender: "other" },
        { id: 2, text: "Lorem ipsum.", sender: "me" },
    ]);

    const handleSend = (text) => {
        setMessages([...messages, { id: Date.now(), text, sender: "me" }]);
    };

    return (
        <div className="max-w-md mx-auto flex flex-col h-screen">
            <MessageList messages={messages} />
            <MessageInput onSend={handleSend} />
        </div>
    );
};

export default MessagePage;

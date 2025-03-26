import React from "react";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
    const [text, setText] = useState("");

    const handleSend = () => {
        if (text.trim() === "") return;
        onSend(text);
        setText("");
    };

    return (
        <div className="bg-base-100 p-4 flex items-center gap-2">
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="input input-bordered w-full"
            />
            <button className="btn btn-primary" onClick={handleSend}>
                ⬆️
            </button>
        </div>
    );
};

export default MessageInput;

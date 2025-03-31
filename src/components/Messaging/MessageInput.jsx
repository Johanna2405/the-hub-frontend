import React from "react";
import { useState } from "react";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleAddMessage = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <div className="p-4 flex items-center gap-2">
      <label className="input w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddMessage();
          }}
          placeholder="Type your message..."
        />
        <button className="btn btn-sm bg-sage btn-icon" onClick={handleSend}>
          <i className="fi-bs-arrow-small-up text-text text-lg"></i>
        </button>
      </label>
    </div>
  );
};

export default MessageInput;

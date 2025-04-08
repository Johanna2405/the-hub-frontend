import React from "react";
import { useState } from "react";
import { useUser } from "../../context/UserContext";
import { emitTyping } from "../../utils/messageApi";

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState("");
  const { user } = useUser();

  const handleAddMessage = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  const handleChange = (e) => {
    setText(e.target.value);
    emitTyping(user);
  };

  return (
    <div className="p-4 flex items-center gap-2">
      <label className="input w-full">
        <input
          type="text"
          value={text}
          onChange={(e) => handleChange(e)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAddMessage();
          }}
          placeholder="Type your message..."
        />
        <button
          className="btn btn-sm bg-sage btn-icon"
          onClick={handleAddMessage}
        >
          <i className="fi-bs-arrow-small-up text-text text-lg"></i>
        </button>
      </label>
    </div>
  );
};

export default MessageInput;

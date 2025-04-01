import { useState } from "react";
import IconBtn from "../IconBtn";

const MessageCard = () => {
  const [expanded, setExpanded] = useState(false);

  const messageText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit neque voluptates temporibus, ut qui recusandae voluptatibus nulla sapiente ad enim quibusdam. Optio repellendus at ipsum doloremque ipsa ea amet corporis.";

  return (
    <div className="rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-[#e2f5a6] text-[#181B4D] flex flex-col justify-between">
      <div>
        <i className="fi-rr-megaphone"></i>
        <h2 className="font-bold text-lg mb-2">New Message</h2>

        <p
          className={`text-sm transition-all duration-300 ${
            !expanded && "line-clamp-2"
          }`}
        >
          {messageText}
        </p>
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => setExpanded(!expanded)}>
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="sage"
            transparent
          />
        </button>
      </div>
    </div>
  );
};

export default MessageCard;

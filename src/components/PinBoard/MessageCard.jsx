import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const MessageCard = () => {
  const [expanded, setExpanded] = useState(false);

  const messageText =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit neque voluptates temporibus, ut qui recusandae voluptatibus nulla sapiente ad enim quibusdam. Optio repellendus at ipsum doloremque ipsa ea amet corporis.";

  return (
    <div className="flex flex-col bg-[#e2f5a6] gap-2 p-4 m-2 rounded-3xl max-w-64 transition-all duration-300 min-h-[250px]">
      <i className="fi-rr-megaphone"></i>
      <h2 className="font-semibold text-[#181B4D]">New Message</h2>

      <div className="flex flex-col h-full justify-between">
        {/* Truncated by default, full text when expanded */}
        <p
          className={`text-sm text-[#181B4D] transition-all duration-300 ${
            expanded ? "" : "line-clamp-2"
          }`}
        >
          {messageText}
        </p>

        <div className="flex justify-end">
          <button
            className="btn btn-ghost btn-square text-[#181B4D] hover:text-base"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const PostCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col bg-neon gap-2 p-4 m-2 rounded-3xl max-w-64 transition-all duration-300 min-h-[250px]">
      <i className="fi-rr-text"></i>
      <h2 className="text-[#181B4D] font-bold text-lg">Post Title</h2>

      <div className="flex flex-col h-full justify-between">
        {/* Expanded part of the PostCard */}
        <p className="">
          {expanded
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sit culpa dolores non voluptatum totam minus hic aliquid dolorem quos aut beatae dolor nesciunt tempore fugit vitae, laborum ipsum dignissimos?"
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
        </p>

        {expanded && (
          <h3 className="mt-2 hover:underline">
            <a href="#" className="">
              View full post
            </a>
          </h3>
        )}

        <div className="flex justify-end">
          <button
            className="text-[#181B4D] btn btn-square btn-ghost hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

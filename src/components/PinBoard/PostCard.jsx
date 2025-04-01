import { useState } from "react";
import IconBtn from "../IconBtn";

const PostCard = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-neon text-[#181B4D] flex flex-col justify-between">
      <div>
        <i className="fi-rr-text"></i>
        <h2 className="font-bold text-lg mb-2">Post Title</h2>

        <p className="text-sm">
          {expanded
            ? "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum sit culpa dolores non voluptatum totam minus hic aliquid dolorem quos aut beatae dolor nesciunt tempore fugit vitae, laborum ipsum dignissimos?"
            : "Lorem ipsum dolor sit amet consectetur adipisicing elit..."}
        </p>

        {expanded && (
          <h3 className="mt-2 hover:underline text-sm font-medium">
            <a href="#" className="">
              View full post
            </a>
          </h3>
        )}
      </div>

      <div className="flex justify-end mt-4">
        <button onClick={() => setExpanded(!expanded)}>
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="neon"
            transparent
          />
        </button>
      </div>
    </div>
  );
};

export default PostCard;

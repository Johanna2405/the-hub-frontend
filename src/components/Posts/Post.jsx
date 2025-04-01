import { useState } from "react";
import IconBtn from "../IconBtn";

const Post = () => {
  const [comments, setComments] = useState([
    "Nice post!",
    "Love the design 🧡",
    "How did you build this?",
  ]);
  const [newComment, setNewComment] = useState("");

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setComments([...comments, newComment]);
    setNewComment("");
  };

  return (
    <div className="flex flex-col w-1/2 min-h-[400px] max-h-[auto] gap-4 bg-neon p-6 rounded-lg shadow-lg">
      {/* Post Author */}
      <div className="flex items-center justify-start gap-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            />
          </div>
        </div>
        <p>Obi-Wan Kenobi</p>
      </div>

      {/* Post Content */}
      <h2 className="text-xl font-bold text-[#181B4D]">Post Title</h2>

      <img
        src="https://i.pinimg.com/736x/5f/a9/94/5fa994c242c42e89ff89a866871123d9.jpg"
        alt=""
        className="object-cover w-full rounded-lg overflow-hidden max-h-72"
      />

      <p className="text-[#181B4D]">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos, at sit
        nulla eveniet quasi ratione aperiam corrupti tenetur eos voluptatum
        nostrum ullam omnis dignissimos asperiores, rerum dolore cupiditate quas
        ex!
      </p>
      <div className="divider"></div>
      {/* 💬 Comment Section */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold text-[#181B4D]">Comments</h3>

        {/* Existing Comments */}
        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
          {comments.map((comment, idx) => (
            <>
              <div className="chat-header">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50">12:45</time>
              </div>
              <div
                key={idx}
                className="bg-white/60 rounded-xl px-4 py-2 text-sm text-[#181B4D]"
              >
                <div className="flex items-center gap-2">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                      />
                    </div>
                  </div>
                  {comment}
                </div>
              </div>
            </>
          ))}
        </div>

        {/* New Comment Input */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input input-bordered flex-1 bg-white/90 text-[#181B4D]"
          />
          <IconBtn
            icon="fi fi-rr-arrow-small-up"
            text="Comment"
            color="lilac"
            onClick={handleAddComment}
          >
            Post
          </IconBtn>
        </div>
      </div>
    </div>
  );
};

export default Post;

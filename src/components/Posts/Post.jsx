import { useState } from "react";
import IconBtn from "../IconBtn";

const Post = ({ post }) => {
  // Fallback wenn kein post via prop übergeben wurde
  const fallbackPost = {
    id: 1,
    title: "Fake Post For Testing",
    content:
      "If you see this post, you are part of the development team. Please ignore this post. It is only here to test the layout of the posts.",
    imageUrl:
      "https://i.pinimg.com/736x/5f/a9/94/5fa994c242c42e89ff89a866871123d9.jpg",
    author: {
      name: "Obi-Wan Kenobi",
      avatar:
        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp",
    },
  };

  const currentPost = post || fallbackPost;

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

  const handleUpdate = () => {
    alert("Update logic goes here!");
  };

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post?")) {
      alert("Delete logic goes here!");
    }
  };

  return (
    <div className="flex flex-col min-h-[400px] gap-4 bg-neon p-6 rounded-2xl">
      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={currentPost.author?.avatar} alt="Author" />
          </div>
        </div>
        <p className="text-[#181B4D]">{currentPost.author?.name}</p>
      </div>

      {/* Title + Image */}
      <h2 className="text-xl font-bold">{currentPost.title}</h2>

      {currentPost.imageUrl && (
        <img
          src={currentPost.imageUrl}
          alt="Post"
          className="object-cover w-full rounded-lg overflow-hidden max-h-72"
        />
      )}

      <p className="text-[#181B4D]">{currentPost.content}</p>

      {/* 🔁 Action Buttons */}
      <div className="flex justify-end gap-2">
        <IconBtn
          icon="fi fi-rr-pencil"
          text="Update"
          color="ultramarine"
          onClick={handleUpdate}
        />
        <IconBtn
          icon="fi fi-rr-trash"
          text="Delete"
          color="red"
          onClick={handleDelete}
        />
      </div>

      <div className="divider"></div>

      {/* 💬 Comments */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold ">Comments</h3>

        <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
          {comments.map((comment, idx) => (
            <div key={idx}>
              <div className="chat-header text-sm font-medium">
                Obi-Wan Kenobi
                <time className="text-xs opacity-50 ml-2">12:45</time>
              </div>
              <div className="bg-white/60 rounded-xl px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-8 rounded-full">
                      <img
                        src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                        alt="avatar"
                      />
                    </div>
                  </div>
                  {comment}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="input input-bordered flex-1 bg-white/90 "
          />
          <IconBtn
            icon="fi fi-rr-arrow-small-up"
            text="Comment"
            color="lilac"
            onClick={handleAddComment}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;

import { useState } from "react";
import { deletePost } from "../../utils/postsAPI";
import IconBtn from "../IconBtn";
import PostModal from "./PostModal";

const Post = ({ post, setPosts }) => {
  const [showEditModal, setShowEditModal] = useState(false);

  if (!post) return null;

  const currentPost = post;
  const modalId = `edit_modal_${currentPost.id}`;

  // Debugging
  console.log("📦 Post Author:", currentPost.author);

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

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(currentPost.id);
        setPosts((prev) => prev.filter((p) => p.id !== currentPost.id));
      } catch (err) {
        console.error("Failed to delete post", err);
        alert("Error deleting post.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[400px] w-1/2 gap-4 bg-neon p-6 rounded-2xl">
      {/* Author */}
      <div className="flex items-center gap-2">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img
              src={
                currentPost.author?.profile_picture
                  ? currentPost.author.profile_picture
                  : "https://www.gravatar.com/avatar/?d=mp&f=y"
              }
              alt="Author"
            />
          </div>
        </div>
        <p className="text-[#181B4D]">{currentPost.author?.username}</p>
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

      <p>{currentPost.content}</p>

      {/* Action Buttons */}
      <div className="flex justify-end gap-2">
        <IconBtn
          icon="fi fi-rr-pencil"
          text="Update"
          color="ultramarine"
          onClick={() => setShowEditModal(true)}
        />

        <IconBtn
          icon="fi fi-rr-trash"
          text="Delete"
          color="red"
          onClick={handleDelete}
        />
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <PostModal
          mode="edit"
          modalId={modalId}
          existingPost={currentPost}
          onPostUpdated={(updated) => {
            setPosts((prev) =>
              prev.map((p) => (p.id === updated.id ? updated : p))
            );
            setShowEditModal(false);
          }}
        />
      )}

      <div className="divider"></div>

      {/* Comments */}
      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-semibold">Comments</h3>

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
            className="input input-bordered flex-1 bg-white/90"
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

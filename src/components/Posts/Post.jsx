import { useState } from "react";
import { deletePost, deleteCommunityPost } from "../../utils/postsAPI";
import { useCommunity } from "../../context/CommunityContext";
import { useUser } from "../../context/UserContext";
import IconBtn from "../IconBtn";
import PostModal from "./PostModal";
import Comments from "./Comments";

const Post = ({ post, setPosts }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const { currentCommunity } = useCommunity();
  const { user } = useUser();

  if (!post) return null;

  const isPrivateSpace = !currentCommunity;
  const currentPost = post;
  const modalId = `edit_modal_${currentPost.id}`;
  const isAuthor = user?.id === currentPost?.author?.id;

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      try {
        if (currentPost.community_id && currentCommunity) {
          await deleteCommunityPost(currentCommunity.id, currentPost.id);
        } else {
          await deletePost(currentPost.id);
        }

        setPosts((prev) => prev.filter((p) => p.id !== currentPost.id));
      } catch (err) {
        console.error("Failed to delete post", err);
        alert("Error deleting post.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-[400px] w-full gap-4 bg-neon p-6 rounded-2xl">
      {/* Author */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img
                src={
                  currentPost.author?.profile_picture
                    ? currentPost.author.profile_picture
                    : "/default-profile.png"
                }
                alt="Author"
              />
            </div>
          </div>
          <p className="text-[#181B4D]">{currentPost.author?.username}</p>
        </div>
        {/* Post Type Tag (only in private view) */}
        {isPrivateSpace && (
          <span className="text-xs text-white bg-lilac px-2 py-1 rounded-full self-start">
            {currentPost.Community?.name
              ? `${currentPost.Community.name}`
              : "Private"}
          </span>
        )}
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
      {isAuthor && (
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
      )}

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
      <Comments postId={currentPost.id} />
    </div>
  );
};

export default Post;

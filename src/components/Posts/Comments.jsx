import { useEffect, useState } from "react";
import { getCommentsByPost, createComment } from "../../utils/commentsAPI";
import CommentItem from "./CommentItem";
import IconBtn from "../IconBtn";
import { useUser } from "../../context/UserContext";

const Comments = ({ postId }) => {
  const { user } = useUser();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadComments = async () => {
      console.log("Fetching comments for postId:", postId);

      if (!postId) {
        console.warn("Post ID is missing – cannot load comments.");
        setLoading(false);
        return;
      }
      try {
        const data = await getCommentsByPost(postId);
        setComments(data);
      } catch (err) {
        console.error("Error loading comments:", err);
      } finally {
        setLoading(false);
      }
    };

    loadComments();
  }, [postId]);

  const handleAddComment = async () => {
    if (newComment.trim() === "") return;

    try {
      const created = await createComment({
        content: newComment,
        post_id: postId,
        user_id: user.id,
      });
      setComments((prev) => [...prev, created]);
      setNewComment("");
    } catch (err) {
      console.error("Error creating comment:", err);
      alert("Failed to add comment.");
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">Comments</h3>

      {loading ? (
        <span className="loading loading-dots loading-sm text-lilac"></span>
      ) : (
        <div className="flex flex-col gap-2 overflow-y-auto pr-2 max-h-[204px]">
          {comments.length === 0 ? (
            <p className="text-sm opacity-70">No comments yet.</p>
          ) : (
            comments.map((comment) => (
              <CommentItem
                key={comment.id}
                comment={comment}
                currentUserId={user.id}
                setComments={setComments}
              />
            ))
          )}
        </div>
      )}

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
  );
};

export default Comments;

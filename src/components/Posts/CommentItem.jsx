import { useState } from "react";
import { updateComment, deleteComment } from "../../utils/commentsAPI";
import IconBtn from "../IconBtn";

const CommentItem = ({ comment, currentUserId, setComments }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleUpdate = async () => {
    try {
      const updated = await updateComment(comment.id, {
        content: editContent,
      });

      setComments((prev) =>
        prev.map((c) =>
          c.id === updated.id ? { ...updated, author: c.author } : c
        )
      );
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating comment:", err);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;

    try {
      await deleteComment(comment.id);
      setComments((prev) => prev.filter((c) => c.id !== comment.id));
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  return (
    <div className="bg-base/60 rounded-2xl px-4 py-2 text-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <div className="avatar">
            <div className="w-8 h-8 rounded-full">
              <img
                src={comment.author?.profile_picture || "/default-profile.png"}
                alt="avatar"
              />
            </div>
          </div>
          <div>
            <p className="font-medium text-xs">{comment.author?.username}</p>
            {isEditing ? (
              <textarea
                className="textarea textarea-bordered w-full mt-1 bg-primary"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
            ) : (
              <p className="mt-1">{comment.content}</p>
            )}
          </div>
        </div>

        {currentUserId === comment.author?.id && (
          <div className="flex gap-1 mt-1">
            {isEditing ? (
              <>
                <IconBtn
                  icon="fi fi-rr-disk"
                  color="lilac"
                  onClick={handleUpdate}
                />
                <IconBtn
                  icon="fi fi-rr-cross-small"
                  color="primary"
                  onClick={() => setIsEditing(false)}
                />
              </>
            ) : (
              <>
                <IconBtn
                  icon="fi fi-rr-pencil"
                  color="lilac"
                  onClick={() => setIsEditing(true)}
                />
                <IconBtn
                  icon="fi fi-rr-trash"
                  color="primary"
                  onClick={handleDelete}
                />
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentItem;

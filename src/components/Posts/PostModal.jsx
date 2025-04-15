import { useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { createPost, updatePost } from "../../utils/postsAPI";
import { createCommunityPost } from "../../utils/community";
import IconBtn from "../IconBtn";

const PostModal = ({
  mode = "create",
  existingPost = {},
  onPostCreated,
  onPostUpdated,
  modalId = "app_modal",
  communityId = null,
}) => {
  const { user } = useUser();

  const [title, setTitle] = useState(existingPost.title || "");
  const [content, setContent] = useState(existingPost.content || "");
  const [imageUrl, setImageUrl] = useState(existingPost.imageUrl || "");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (mode === "edit") {
      document.getElementById(modalId)?.showModal();
    }
  }, [mode, modalId]);

  const handleSubmit = async () => {
    if (!title || !content) return alert("Please fill in all fields");
    setSubmitting(true);

    const payload = {
      title,
      content,
      imageUrl,
      ...(communityId && { community_id: communityId }),
      ...(!communityId && { userId: existingPost.userId ?? user.id }),
    };

    try {
      if (mode === "edit") {
        const updated = await updatePost(existingPost.id, payload);
        onPostUpdated?.(updated);
      } else {
        const created = communityId
          ? await createCommunityPost(communityId, payload)
          : await createPost(payload);
        onPostCreated?.(created);
      }

      document.getElementById(modalId).close();
      setTitle("");
      setContent("");
      setImageUrl("");
    } catch (err) {
      console.error("Error submitting post", err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      {mode === "create" && (
        <IconBtn
          icon="fi-rr-plus-small"
          color="neon"
          onClick={() => document.getElementById(modalId).showModal()}
        />
      )}

      <dialog id={modalId} className="modal backdrop-blur-sm !bg-primary/25">
        <div className="modal-box bg-neon">
          <h3 className="font-bold text-lg mb-4">
            {mode === "edit" ? "Edit your post" : "Create a new post"}
          </h3>

          <div className="flex flex-col gap-4">
            <div>
              <label className="fieldset-label text-text">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter a post title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div>
              <label className="fieldset-label text-text">Post Content</label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Enter the post content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>

            <div>
              <label className="fieldset-label text-text">Image URL</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Paste an image URL"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {imageUrl && (
              <div className="mt-2">
                <label className="fieldset-label text-text">Preview</label>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
              </div>
            )}

            <div className="flex w-full justify-end">
              <IconBtn
                icon="fi-rr-disk"
                text={
                  submitting
                    ? mode === "edit"
                      ? "Updating..."
                      : "Posting..."
                    : mode === "edit"
                    ? "Update"
                    : "Submit"
                }
                color="lilac"
                onClick={handleSubmit}
                disabled={submitting}
              />
            </div>
          </div>
        </div>

        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
};

export default PostModal;

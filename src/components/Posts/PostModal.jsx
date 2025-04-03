import { useState } from "react";
import { createPost } from "../../utils/postsAPI";
import { useUser } from "../../context/UserContext";
import IconBtn from "../IconBtn";

const PostModal = ({ onPostCreated }) => {
  const { user } = useUser();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!title || !content) return alert("Please fill in all fields");

    setSubmitting(true);

    try {
      const newPost = await createPost({
        userId: user.id,
        title,
        content,
        imageUrl,
      });

      onPostCreated(newPost);
      document.getElementById("app_modal").close();

      // Reset form
      setTitle("");
      setContent("");
      setImageUrl("");
    } catch (err) {
      console.error("❌ Error creating post", err);
      alert("Failed to create post");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div>
      <IconBtn
        icon="fi fi-rr-plus"
        color="neon"
        onClick={() => document.getElementById("app_modal").showModal()}
      />

      <dialog id="app_modal" className="modal">
        <div className="modal-box bg-neon">
          <h3 className="font-bold text-lg mb-4">Create a new post</h3>

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
                text={submitting ? "Posting..." : "Submit"}
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

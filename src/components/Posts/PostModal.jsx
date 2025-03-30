import IconBtn from "../IconBtn";

const PostModal = ({ children, onClose }) => {
  return (
    <div>
      <IconBtn
        icon="fi fi-rr-plus"
        color="neon"
        onClick={() => document.getElementById("app_modal").showModal()}
      />
      <dialog id="app_modal" className="modal">
        <div className="modal-box bg-neon">
          <h3 className="font-bold text-lg text-[#181B4D] mb-4">
            Create a new post
          </h3>
          <div className="flex flex-col gap-4">
            <div>
              <label className="fieldset-label text-text">Title</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Enter a post title"
              />
            </div>
            <div>
              <label className="fieldset-label text-text">Post Content</label>
              <textarea
                className="textarea h-24 w-full"
                placeholder="Enter the post content"
              ></textarea>
            </div>
            <div>
              <label className="fieldset-label text-text">Upload a file</label>
              <input
                type="file"
                className="file-input file-input-ghost w-full bg-base file:bg-ultramarine file:text-white file:border-none file:px-4 file:py-2 file:rounded-lg"
              />
            </div>
            <div className="flex w-full justify-end">
              <IconBtn
                icon="fi-rr-disk"
                text="Submit"
                color="lilac"
                onClick={() => document.getElementById("app_modal").close()}
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

import { useForm } from "react-hook-form";

const NewListCard = ({
  onSave = () => {},
  onDelete = () => {},
  defaultValues = {
    title: "",
    category: "To Do",
    privacy: "Private",
  },
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <div className="bg-primary p-6 rounded-xl w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full p-2 rounded border"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">
            Choose Category
          </label>
          <select
            {...register("category")}
            className="w-full p-2 rounded border text-text"
          >
            <option value="To Do">To Do</option>
            <option value="Packing List">Packing List</option>
            <option value="Grocery List">Grocery List</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1 text-text">
            Choose Privacy
          </label>
          <select
            {...register("privacy")}
            className="w-full p-2 rounded border text-text"
          >
            <option value="Private">Private</option>
            <option value="Community">Community</option>
          </select>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={onDelete}
            className="flex items-center gap-1 text-red-600 border border-red-600 px-4 py-2 rounded"
          >
            🗑 {defaultValues.title ? "Delete" : "Cancel"}
          </button>
          <button
            type="submit"
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded"
          >
            💾 Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewListCard;

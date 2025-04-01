import { useForm } from "react-hook-form";
import ListIconBtn from "./ListIconBtn";

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label className="block font-semibold mb-1 text-text">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            placeholder="Title"
            className="w-full p-3 rounded-xl border-base bg-base font-extralight text-text focus:outline-none"
          />
          {errors.title && (
            <p className="text-sm text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="block font-semibold mb-1 text-text">
            Choose Category
          </label>
          <select
            {...register("category")}
            className="w-full p-3 border-base text-text bg-base rounded-2xl font-extralight appearance-none pr-10 focus:outline-none"
          >
            <option value="To Do List">To Do List</option>
            <option value="Travel List">Travel List</option>
            <option value="Shopping List">Shopping List</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-[10%]">
            <ListIconBtn color={"text"} icon={"fi-rr-angle-down"} transparent />
          </div>
        </div>

        <div className="flex flex-col relative">
          <label className="block font-semibold mb-1 text-text">
            Choose Privacy
          </label>
          <select
            {...register("privacy")}
            className="w-full p-3 border-base text-text bg-base rounded-2xl font-extralight appearance-none pr-10 focus:outline-none"
          >
            <option value="Private">Private</option>
            <option value="Community">Community</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-[10%]">
            <ListIconBtn color={"text"} icon={"fi-rr-angle-down"} transparent />
          </div>
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <ListIconBtn
            text={"delete"}
            color={"base"}
            icon={"fi-rr-trash"}
            onClick={onDelete}
          />
          <ListIconBtn
            text={"save"}
            color={"ultramarine"}
            icon={"fi-rr-disk"}
            onClick={onSave}
          />
        </div>
      </form>
    </div>
  );
};

export default NewListCard;

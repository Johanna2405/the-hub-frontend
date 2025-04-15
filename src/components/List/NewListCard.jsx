import { useForm } from "react-hook-form";
import ListIconBtn from "./ListIconBtn";
import { createList } from "../../utils/listsAPI";
import { useNavigate } from "react-router";
import { useUser } from "../../context/UserContext";
import { useCommunity } from "../../context/CommunityContext";
import { showToast } from "../../utils/toast";

const NewListCard = ({
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

  const navigate = useNavigate();
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  let community_id = currentCommunity?.id;

  const onSubmit = async (data) => {
    try {
      const user_id = user.id;

      if (data.privacy === "Private") {
        community_id = null;
      }

      const listPayload = {
        ...data,
        user_id,
        community_id,
      };

      await createList(listPayload);

      showToast(`List added!`, "success");
      navigate(`/lists`);
    } catch (error) {
      console.error("Error creating list:", error);
      showToast(`Error creating list!`, "error");
    }
  };

  const onCancel = () => {
    navigate(`/lists`);
  };

  return (
    <div className="bg-primary p-6 rounded-xl w-full">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col">
          <label className="block font-semibold mb-1 text-text">Title</label>
          <input
            {...register("title", {
              required: "Title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
              maxLength: {
                value: 50,
                message: "Title must be 50 characters or less",
              },
            })}
            placeholder="Title"
            className="w-full p-3 rounded-xl border-base bg-base font-extralight text-text focus:outline-none"
          />
          {errors.title && (
            <p className="text-sm !text-red-600 mt-1">{errors.title.message}</p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="block font-semibold mb-1 text-text">
            Choose Category
          </label>
          <select
            {...register("category", {
              required: "Please select a category",
            })}
            className="w-full p-3 border-base text-text bg-base rounded-2xl font-extralight appearance-none pr-10 focus:outline-none"
          >
            <option value="To Do List">To Do List</option>
            <option value="Travel List">Travel List</option>
            <option value="Shopping List">Shopping List</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-[10%]">
            <ListIconBtn color={"text"} icon={"fi-rr-angle-down"} transparent />
          </div>
          {errors.category && (
            <p className="text-sm !text-red-600 mt-1">
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="flex flex-col relative">
          <label className="block font-semibold mb-1 text-text">
            Choose Privacy
          </label>
          <select
            {...register("privacy", {
              required: "Please select privacy level",
              validate: (value) =>
                value === "Private" ||
                value === "Community" ||
                "Invalid option",
            })}
            className="w-full p-3 border-base text-text bg-base rounded-2xl font-extralight appearance-none pr-10 focus:outline-none"
          >
            <option value="Private">Private</option>
            <option value="Community">Community</option>
          </select>
          <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-[10%]">
            <ListIconBtn color={"text"} icon={"fi-rr-angle-down"} transparent />
          </div>
          {errors.privacy && (
            <p className="text-sm !text-red-600 mt-1">
              {errors.privacy.message}
            </p>
          )}
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <ListIconBtn
            text={"delete"}
            color={"base"}
            icon={"fi-rr-trash"}
            onClick={onCancel}
          />
          <ListIconBtn
            text={"save"}
            color={"ultramarine"}
            icon={"fi-rr-disk"}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default NewListCard;

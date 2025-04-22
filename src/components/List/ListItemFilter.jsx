import { useUser } from "../../context/UserContext";

const ListItemFilter = ({ activeFilter, setActiveFilter, isGrocery }) => {
  const { currentTheme } = useUser();

  const isDarkGrocery = currentTheme === "thedarkhub" && isGrocery;
  const isLightGrocery = currentTheme !== "thedarkhub" && isGrocery;

  const filters = ["All", "Checked", "To Do"];

  const getButtonClasses = (filter) => {
    const isActive = filter === activeFilter;

    if (isDarkGrocery) {
      return isActive
        ? "text-[#f5f5f5] border-[#f5f5f5]"
        : "text-[#f5f5f5] border-[#f5f5f5] border-dashed";
    }

    if (isLightGrocery) {
      return isActive
        ? "text-base border-base"
        : "text-base border-base border-dashed";
    }

    return isActive
      ? "text-text border-text"
      : "text-text border-text border-dashed";
  };

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-1 rounded-2xl text-sm cursor-pointer transition-all duration-300 hover:scale-105 border ${getButtonClasses(
            filter
          )}`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ListItemFilter;

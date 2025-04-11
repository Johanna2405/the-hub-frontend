import { useUser } from "../../context/UserContext";

const CardFilter = ({ selected, onFilterChange }) => {
  const { pinboardSettings } = useUser();

  const filters = [
    { label: "All", value: "all", color: "primary" }, // neutral
    { label: "Posts", value: "post", color: "neon" }, // neon
    { label: "Lists", value: "list", color: "ultramarine" }, // ultramarine
    { label: "Messages", value: "message", color: "sage" }, // sage
    { label: "Events", value: "event", color: "lilac" }, // lilac
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {filters.map(
        (filter) =>
          pinboardSettings[filter.value] && (
            <button
              key={filter.value}
              onClick={() => onFilterChange(filter.value)}
              className={`px-4 py-1 rounded-2xl text-sm transition bg-${
                selected === filter.value ? filter.color : "transparent"
              } border ${
                selected === filter.value ? "border-none" : "border-primary"
              } text-${
                selected === filter.value ? "text" : "var(--color-text)"
              } `}
            >
              {filter.label}
            </button>
          )
      )}
    </div>
  );
};

export default CardFilter;

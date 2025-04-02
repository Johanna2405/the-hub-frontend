const CardFilter = ({ selected, onFilterChange }) => {
  const filters = [
    { label: "All", value: "all", color: "#D4DEE8" }, // neutral
    { label: "Posts", value: "post", color: "#d9e73c" }, // neon
    { label: "Lists", value: "list", color: "#5b4efe" }, // ultramarine
    { label: "Messages", value: "message", color: "#e2f5a6" }, // sage
    { label: "Events", value: "event", color: "#d5b4fb" }, // lilac
  ];

  return (
    <div className="flex gap-2 flex-wrap justify-center mb-4">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          style={{
            backgroundColor:
              selected === filter.value ? filter.color : "transparent",
            border: selected === filter.value ? "none" : "1px solid #ccc",
            color: selected === filter.value ? "#181B4D" : "#333",
          }}
          className="px-4 py-1 rounded-2xl text-sm transition"
        >
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default CardFilter;

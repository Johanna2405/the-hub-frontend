const ListItemFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = ["All", "Checked", "To Do"];

  return (
    <div className="flex gap-2 mb-2 flex-wrap">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-4 py-1 rounded-2xl text-sm cursor-pointer transition-all duration-300 hover:scale-105 border-1 ${
            activeFilter === filter
              ? "text-text border-text"
              : "text-text border-dashed"
          }`}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default ListItemFilter;

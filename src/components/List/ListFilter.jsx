const ListFilter = ({ activeFilter, setActiveFilter }) => {
  const filters = ["All", "To Do", "Shopping", "Travel"];

  return (
    <div className="flex flex-wrap gap-2 w-full">
      {filters.map((filter) => (
        <div
          key={filter}
          onClick={() => setActiveFilter(filter)}
          className={`px-6 cursor-pointer transition-all duration-300 hover:scale-105 rounded-3xl border-1 text-text bg-primary ${
            activeFilter === filter ? "border-text" : "border-transparent"
          }`}
        >
          {filter}
        </div>
      ))}
    </div>
  );
};

export default ListFilter;

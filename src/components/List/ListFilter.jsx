const ListFilter = () => {
  return (
    <div className="flex flex-wrap gap-3 w-full">
      {["All", "To Do", "Shopping", "Private"].map((filter) => (
        <div
          key={filter}
          className="badge badge-primary px-4 py-2 cursor-pointer transition-all duration-300 hover:scale-105"
        >
          {filter}
        </div>
      ))}
    </div>
  );
};

export default ListFilter;

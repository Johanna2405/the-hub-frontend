const CardFilter = () => {
  // add useSate for active filter

  return (
    <div className="flex gap-1">
      <div className="badge badge-primary m-1 p-3 cursor-pointer transition-all duration-300 hover:transform hover:scale-110">
        All
      </div>
      <div className="badge badge-accent m-1 p-3 cursor-pointer transition-all duration-300 hover:transform hover:scale-110">
        Posts
      </div>
      <div className="badge bg-ultramarine m-1 p-3 cursor-pointer transition-all duration-300 hover:transform hover:scale-110">
        Lists
      </div>
      <div className="badge bg-sage m-1 p-3 cursor-pointer transition-all duration-300 hover:transform hover:scale-110">
        Messages
      </div>
      <div className="badge badge-secondary m-1 p-3 cursor-pointer transition-all duration-300 hover:transform hover:scale-110">
        Events
      </div>
    </div>
  );
};

export default CardFilter;

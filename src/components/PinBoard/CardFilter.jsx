const CardFilter = () => {
  return (
    <div className="flex gap-1">
      <div className="badge badge-primary m-1 p-3 hover:border-1 hover:border-text">
        All
      </div>
      <div className="badge badge-accent m-1 p-3 hover:border-1 hover:border-text">
        Posts
      </div>
      <div className="badge bg-[#5b4efe] m-1 p-3 hover:border-1 hover:border-text">
        Lists
      </div>
      <div className="badge bg-[#e2f5a6] m-1 p-3 hover:border-1 hover:border-text">
        Messages
      </div>
      <div className="badge badge-secondary m-1 p-3 hover:border-1 hover:border-text">
        Events
      </div>
    </div>
  );
};

export default CardFilter;

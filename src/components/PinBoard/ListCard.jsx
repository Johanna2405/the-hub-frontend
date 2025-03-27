import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const ListCard = () => {
  const [expanded, setExpanded] = useState(false);

  const items = [
    "Lorem ipsum",
    "Dolor sit amet",
    "Consectetur",
    "Adipiscing elit",
    "Sed do eiusmod",
    "Tempor incididunt",
  ];

  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div className="flex flex-col bg-[#D4DEE8] gap-2 p-4 m-4 rounded-lg max-w-64 shadow">
      <h2 className="text-[#181B4D] font-bold text-lg">To Do List</h2>

      <ul className="text-[#181B4D] text-sm font-light">
        {visibleItems.map((item, index) => (
          <li key={index} className="my-1">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-xs border-[#181B4D] text-[#181B4D] checked:border-[#181B4D] mr-2"
              />
              {item}
            </label>
          </li>
        ))}
      </ul>

      {items.length > 3 && (
        <div className="flex justify-end">
          <button
            className="btn btn-ghost btn-sm text-[#181B4D] hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      )}
    </div>
  );
};

export default ListCard;

// colors:
// text [#181B4D]
// primary [#D4DEE8]
// neon [#ToDoListCard

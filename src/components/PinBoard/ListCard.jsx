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
    <div className="flex flex-col bg-primary gap-2 p-4 m-4 rounded-3xl max-w-64 transition-all duration-300 min-h-[250px]">
      <i className="fi-rs-list-check"></i>
      <h2 className="">To Do List</h2>

      <div className="flex flex-col h-full justify-between">
        <ul className="">
          {visibleItems.map((item, index) => (
            <li key={index} className="my-1">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs border border-text text-text checked:border-text mr-2"
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
        {/* Expanded part of the ListCard */}
        {items.length > 3 && (
          <div className="flex justify-end">
            <button
              className="btn btn-ghost btn-square text-[#181B4D] hover:text-base"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListCard;

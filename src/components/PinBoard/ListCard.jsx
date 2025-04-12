import { useState } from "react";
import IconBtn from "../IconBtn";

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
    <div className="rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-primary text-[#181B4D] flex flex-col justify-between">
      <div>
        <i className="fi-rs-list-check"></i>
        <h2 className="font-bold text-lg mb-2">To Do List</h2>

        <ul className="space-y-1 text-sm">
          {visibleItems.map((item, index) => (
            <li key={index}>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="checkbox checkbox-xs border border-[#181B4D] text-[#181B4D] checked:border-[#181B4D] mr-2"
                />
                {item}
              </label>
            </li>
          ))}
        </ul>
      </div>

      {items.length > 3 && (
        <div className="flex justify-end mt-4">
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="neon"
            transparent
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      )}
    </div>
  );
};

export default ListCard;

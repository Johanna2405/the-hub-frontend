import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ListItem from "./ListItem";

const ListCard = ({
  title = "",
  items = [],
  privacy = "private",
  type = "default",
  filters = [],
  selectedFilter = "",
  onFilterChange = () => {},
  onItemToggle = () => {},
  onAddItem = () => {},
  showAddItemInput = true,
}) => {
  const [expanded, setExpanded] = useState(false);

  const renderFilters = () => {
    if (filters.length === 0) return null;
    return (
      <div className="flex gap-2 mb-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-2 py-1 rounded text-sm ${
              selectedFilter === filter
                ? "bg-white text-black"
                : "bg-transparent border"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>
    );
  };

  const cardStyles = {
    default: "bg-primary text-text",
    grocery: "bg-ultramarine text-primary",
    packing: "bg-primary text-text",
  };

  const visibleItems = expanded ? items : items.slice(0, 3);

  return (
    <div
      className={`rounded-xl p-4 mb-4 transition-all duration-300 ${
        cardStyles[type] || cardStyles.default
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-xs border px-2 py-1 rounded">{privacy}</span>
      </div>

      {renderFilters()}

      <ul className="space-y-1">
        {visibleItems.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            onToggle={onItemToggle}
            type={type}
          />
        ))}
      </ul>

      {items.length > 3 && (
        <div className="flex justify-end mt-2">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-text hover:text-gray-600 transition-colors"
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      )}

      {showAddItemInput && (
        <div className="mt-3 flex gap-2">
          <input
            type="text"
            placeholder="New List Item"
            className="flex-1 p-2 rounded text-text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                onAddItem(e.target.value);
                e.target.value = "";
              }
            }}
          />
          <button className="bg-primary text-text px-3 rounded">✓</button>
        </div>
      )}
    </div>
  );
};

export default ListCard;

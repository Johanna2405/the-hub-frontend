import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import ListItem from "./ListItem";
import IconBtn from "../IconBtn";

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
}) => {
  const [expanded, setExpanded] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [showAddItemInput, setShowAddItemInput] = useState(false);

  const renderFilters = () => {
    if (filters.length === 0) return null;
    return (
      <div className="flex gap-2 mb-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1 rounded-2xl text-sm ${
              selectedFilter === filter
                ? "bg-base text-text"
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
  };

  const visibleItems = expanded ? items : items.slice(0, 3);

  const handleAddItem = () => {
    if (!newItemText.trim()) return;
    onAddItem(newItemText.trim());
    setNewItemText("");
  };

  return (
    <div
      className={`rounded-xl p-4 mb-4 transition-all duration-300 ${
        cardStyles[type] || cardStyles.default
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-xs border px-2 py-1 rounded-full">{privacy}</span>
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

      {showAddItemInput && (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            placeholder="New List Item"
            className="flex-1 px-2 py-2 rounded-2xl placeholder:text-gray-400 focus:outline-none bg-base text-text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleAddItem();
            }}
          />
          <IconBtn color="base" icon="fi-ss-check" onClick={handleAddItem} />
        </div>
      )}

      <div className="flex justify-end mt-2">
        <button
          onClick={() => {
            setExpanded(!expanded);
            setShowAddItemInput(!expanded);
          }}
        >
          {expanded ? (
            <IconBtn color={type} icon={"fi-rr-angle-up"} transparent />
          ) : (
            <IconBtn color={type} icon={"fi-rr-angle-down"} transparent />
          )}
        </button>
      </div>
    </div>
  );
};

export default ListCard;

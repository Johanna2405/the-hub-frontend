import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import ListIconBtn from "./ListIconBtn";

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
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (items.length === 0) {
      setExpanded(true);
      setShowAddItemInput(true);
    }
  }, [items]);

  const renderFilters = () => {
    if (filters.length === 0) return null;
    return (
      <div className="flex gap-2 mb-2 flex-wrap">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => onFilterChange(filter)}
            className={`px-4 py-1 rounded-2xl text-sm cursor-pointer transition-all duration-300 hover:scale-105 ${
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

  const toggleEditMode = () => {
    setEditMode((prev) => !prev);
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

      {visibleItems.length === 0 && (
        <div className="text-center py-4 font-semibold">
          List is empty add some items...
        </div>
      )}

      <ul className="space-y-1">
        {visibleItems.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            text={item.text}
            checked={item.checked}
            onToggle={onItemToggle}
            type={type}
            editMode={editMode}
            onUpdate={onUpdate}
            onDelete={onDelete}
            expanded={expanded}
          />
        ))}
      </ul>

      {showAddItemInput && expanded && (
        <>
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
            <ListIconBtn
              color="base"
              icon="fi-ss-check"
              onClick={handleAddItem}
              className="text-sm"
              title="Add Item"
            />
            {items.length > 0 && (
              <ListIconBtn
                color="base"
                icon="fi-rr-tools"
                onClick={toggleEditMode}
                className="text-sm"
                title="Manage Items"
              />
            )}
          </div>
        </>
      )}

      {items.length > 0 && (
        <div className="flex justify-end mt-2">
          {expanded ? (
            <ListIconBtn
              color={type}
              onClick={() => {
                setExpanded(false);
                setShowAddItemInput(false);
                setEditMode(false);
              }}
              icon={"fi-rr-angle-up"}
              transparent
            />
          ) : (
            <ListIconBtn
              color={type}
              onClick={() => {
                setExpanded(true);
                setShowAddItemInput(true);
              }}
              icon={"fi-rr-angle-down"}
              transparent
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ListCard;

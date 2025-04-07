import { useState, useEffect } from "react";
import ListItem from "./ListItem";
import ListIconBtn from "./ListIconBtn";
import ListItemFilter from "./ListItemFilter";

const ListCard = ({
  title = "",
  items = [],
  privacy = "private",
  onItemToggle = () => {},
  onAddItem = () => {},
  onUpdate = () => {},
  onDelete = () => {},
}) => {
  const [expanded, setExpanded] = useState(false);
  const [newItemText, setNewItemText] = useState("");
  const [showAddItemInput, setShowAddItemInput] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [globalFilter, setGlobalFilter] = useState("All");

  useEffect(() => {
    if (items.length === 0) {
      setExpanded(true);
      setShowAddItemInput(true);
    }
  }, [items]);

  const cardStyles = {
    default: "bg-primary text-text",
    grocery: "bg-ultramarine text-primary",
  };

  const normalizedTitle = title.toLowerCase();
  const isGrocery =
    normalizedTitle.includes("grocery") ||
    normalizedTitle.includes("groceries");
  const colorClass = isGrocery ? "ultramarine" : "base";

  const cardStyleClass = isGrocery ? cardStyles.grocery : cardStyles.default;

  const filteredItems = items.filter((item) => {
    if (globalFilter === "Checked") return item.is_completed;
    if (globalFilter === "To Do") return !item.is_completed;
    return true;
  });

  const visibleItems = expanded ? filteredItems : filteredItems.slice(0, 4);

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
      className={`rounded-xl p-4 mb-4 transition-all duration-300 ${cardStyleClass}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold">{title}</h3>
        <span className="text-xs border px-2 py-1 rounded-full">{privacy}</span>
      </div>

      {visibleItems.length > 0 && (
        <ListItemFilter
          activeFilter={globalFilter}
          setActiveFilter={setGlobalFilter}
        />
      )}

      {visibleItems.length === 0 && (
        <div className="text-center py-4 font-semibold">
          {items.length === 0
            ? "List is empty, add some items..."
            : "No items match this filter."}
        </div>
      )}

      <ul className="space-y-1">
        {visibleItems.map((item) => (
          <ListItem
            key={item.id}
            id={item.id}
            text={item.name}
            title={title}
            checked={item.is_completed}
            onToggle={onItemToggle}
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
              className="flex-1 px-2 py-2 rounded-2xl placeholder:text-gray-400 focus:outline-none bg-base !text-[#181a4d]"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleAddItem();
              }}
            />
            <ListIconBtn
              color={colorClass}
              icon="fi-ss-check"
              onClick={handleAddItem}
              className="text-sm"
              title="Add Item"
            />
            {items.length > 0 && (
              <ListIconBtn
                color={colorClass}
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
              color={cardStyleClass}
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
              color={cardStyleClass}
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

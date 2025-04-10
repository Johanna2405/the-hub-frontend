import { useEffect, useState } from "react";
import ListIconBtn from "./ListIconBtn";

const ListItem = ({
  id,
  text,
  title,
  checked,
  onToggle,
  onUpdate,
  onDelete,
  editMode,
  expanded,
  category,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const normalizedCategory = category?.toLowerCase() || "";
  const isGrocery =
    title.toLowerCase() === "groceries" ||
    title.toLowerCase() === "grocery" ||
    normalizedCategory === "shopping list";

  const ringColorClass = isGrocery ? "ring-primary" : "ring-text";
  const colorClass = isGrocery ? "ultramarine" : "base";
  const textClass = isGrocery ? "ultramarine" : "base";

  useEffect(() => {
    setEditText(text);
  }, [text]);

  useEffect(() => {
    if (!expanded) setIsEditing(false);
  }, [expanded]);

  const handleEditClick = () => setIsEditing(true);

  const handleSaveEdit = () => {
    const trimmed = editText.trim();
    if (trimmed && trimmed !== text) {
      onUpdate(id, trimmed);
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(text);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  const handleBlur = () => {
    if (isEditing) handleSaveEdit();
  };

  return (
    <>
      {editMode && isEditing && expanded ? (
        <li className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(id)}
              className={`
                appearance-none 
                h-4 w-4
                rounded-full 
                ring-1 
                ${ringColorClass} 
                cursor-pointer
                flex-shrink-0
                transition 
                duration-150
                ease-in-out
                focus:outline-none
              `}
            />
            {checked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none ml-1">
                <ListIconBtn
                  color={colorClass}
                  icon="fi-ss-check"
                  transparent
                />
              </div>
            )}
          </label>

          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className={`flex-1 ${ringColorClass} rounded-md focus:outline-none ${textClass}`}
            autoFocus
          />

          <ListIconBtn
            color={colorClass}
            icon="fi-ss-check"
            onClick={handleSaveEdit}
            className="text-sm"
          />
          <ListIconBtn
            color={colorClass}
            icon="fi-rr-cross-small"
            onClick={handleCancelEdit}
            className="text-sm"
          />
        </li>
      ) : (
        <li className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
              onChange={() => onToggle(id)}
              className={`
                appearance-none 
                h-4 w-4
                rounded-full 
                ring-1 
                ${ringColorClass} 
                cursor-pointer
                flex-shrink-0
                transition 
                duration-150
                ease-in-out
                focus:outline-none
              `}
            />
            {checked && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none ml-1">
                <ListIconBtn
                  color={colorClass}
                  icon="fi-ss-check"
                  transparent
                />
              </div>
            )}
          </label>

          <span className={`${checked ? "line-through opacity-90" : ""}`}>
            {text}
          </span>

          {editMode && expanded && (
            <div className="ml-auto flex gap-1">
              <ListIconBtn
                color={colorClass}
                icon="fi-rr-pencil"
                onClick={handleEditClick}
                transparent
                className="text-sm"
              />
              <ListIconBtn
                color={colorClass}
                icon="fi-rr-trash"
                onClick={() => onDelete(id)}
                transparent
                className="text-sm"
              />
            </div>
          )}
        </li>
      )}
    </>
  );
};

export default ListItem;

import { useEffect, useState, useCallback } from "react";
import ListIconBtn from "./ListIconBtn";

const ListItem = ({
  id,
  text,
  checked = false,
  type,
  onToggle = () => {},
  onUpdate = () => {},
  onDelete = () => {},
  editMode = false,
  setEditMode,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const isGrocery = type === "grocery";
  const ringColorClass = isGrocery ? "ring-primary" : "ring-text";
  const colorClass = isGrocery ? "ultramarine" : "base";

  useEffect(() => {
    if (!editMode) setIsEditing(false);
  }, [editMode]);

  const handleEditClick = useCallback(() => {
    setIsEditing(true);
    setEditMode(true);
  }, [setEditMode]);

  const handleSaveEdit = useCallback(() => {
    if (editText.trim()) {
      onUpdate(id, editText);
    }
    setIsEditing(false);
    setEditMode(false);
  }, [id, editText, onUpdate, setEditMode]);

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditText(text);
    setEditMode(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSaveEdit();
    if (e.key === "Escape") handleCancelEdit();
  };

  return (
    <>
      {editMode && isEditing ? (
        <li className="flex items-center gap-2">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={checked}
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
            className={`
              flex-1
              ${ringColorClass} 
              rounded-md
              focus:outline-none
              text-text
            `}
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

          {editMode && (
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

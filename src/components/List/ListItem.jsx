import { Check } from "lucide-react";

const ListItem = ({ id, text, checked = false, type, onToggle = () => {} }) => {
  const ringColorClass = type === "grocery" ? "ring-primary" : "ring-text";
  const focusRindColorClass = type === "grocery" ? "ring-primary" : "ring-text";
  return (
    <li className="flex items-center gap-2">
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => onToggle(id)}
          className={`
            appearance-none 
            h-5 w-5 
            rounded-full 
            ring-1 
            ${ringColorClass} 
            cursor-pointer
            flex-shrink-0
            transition 
            duration-150
            ease-in-out
            focus:outline-none 
            focus:ring-2 
            ${focusRindColorClass} 
          `}
        />

        {checked && (
          <Check
            className="absolute left-0 top-0 w-5 h-5 pointer-events-none"
            style={{
              stroke:
                type === "grocery" ? "var(--color-base)" : "var(--color-text)",
            }}
            strokeWidth={3}
          />
        )}
      </label>

      <span className={`${checked ? "line-through opacity-90" : ""}`}>
        {text}
      </span>
    </li>
  );
};

export default ListItem;

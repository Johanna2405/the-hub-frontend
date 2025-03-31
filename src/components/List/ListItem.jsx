import IconBtn from "../IconBtn";

const ListItem = ({ id, text, checked = false, type, onToggle = () => {} }) => {
  const ringColorClass = type === "grocery" ? "ring-primary" : "ring-text";
  const focusRingColorClass = type === "grocery" ? "ring-primary" : "ring-text";
  const colorClass = type == "grocery" ? "ultramarine" : "base";

  return (
    <li className="flex items-center gap-2">
      <label className="relative inline-flex items-center cursor-pointer">
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
            ${focusRingColorClass} 
          `}
        />

        {checked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none ml-2 mb-1">
            <IconBtn color={colorClass} icon="fi-ss-check" transparent />
          </div>
        )}
      </label>

      <span className={`${checked ? "line-through opacity-90" : ""}`}>
        {text}
      </span>
    </li>
  );
};

export default ListItem;

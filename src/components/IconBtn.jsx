import { useUser } from "../context/UserContext";

const IconBtn = ({ text, icon, color, transparent, onClick }) => {
  const { effectiveTheme } = useUser();
  const isDarkMode = effectiveTheme === "thedarkhub";

  const bgClasses = transparent
    ? "!bg-transparent btn-no-noise"
    : `bg-${color}`;

  const textColorClass =
    isDarkMode || color === "ultramarine" || (!isDarkMode && color === "lilac")
      ? "text-[#f5f5f5]"
      : "text-text";

  return (
    <button
      className={`btn border-none flex ${bgClasses} ${textColorClass} ${
        !text ? "gap-0" : "gap-2"
      }`}
      onClick={onClick}
    >
      <i className={`pt-1 text-lg ${icon} ${textColorClass}`}></i>
      {text && <span className="font-semibold">{text}</span>}
    </button>
  );
};

export default IconBtn;

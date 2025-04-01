const IconBtn = ({
  text,
  icon,
  color,
  transparent,
  onClick,
  className = "",
}) => {
  const bgClasses = transparent
    ? "!bg-transparent btn-no-noise"
    : `bg-${color}`;

  return (
    <button
      className={`btn border-none flex ${bgClasses} ${
        color === "ultramarine" ? "text-base" : "text-text"
      } ${!text ? "gap-0" : "gap-2"}`}
      onClick={onClick}
    >
      <i
        className={`pt-1 text-lg ${icon} ${
          color === "ultramarine" ? "text-base" : "text-text"
        } ${className}`}
      ></i>
      {text && <span className="font-semibold">{text}</span>}
    </button>
  );
};

export default IconBtn;

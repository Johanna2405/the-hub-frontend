const ListIconBtn = ({
  text,
  icon,
  color,
  transparent,
  onClick,
  className = "",
  title = "",
}) => {
  const bgClasses = transparent
    ? "!bg-transparent btn-no-noise"
    : `bg-${color}`;

  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        btn border-none flex items-center
        ${bgClasses}
        ${color === "ultramarine" ? "text-base" : "text-text"}
        ${!text ? "gap-0" : "gap-2"}
      `}
    >
      <i
        className={`
          pt-1 text-lg ${icon}
          ${color === "ultramarine" ? "text-base" : "text-text"}
          ${className}
        `}
      ></i>
      {text && <span className="font-semibold">{text}</span>}
    </button>
  );
};

export default ListIconBtn;

const IconBtn = ({ text, icon, color, onClick }) => {
  return (
    <button
      className={`btn border-none flex bg-${color} ${
        color === "ultramarine" ? "text-base" : "text-text"
      } ${!text ? "gap-0" : "gap-2"}`}
      onClick={onClick}
    >
      <i className={`pt-1 text-lg ${icon}`}></i>
      <span className={`font-semibold`}>{text}</span>
    </button>
  );
};

export default IconBtn;

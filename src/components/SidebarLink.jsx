import { NavLink } from "react-router";

const SidebarLink = ({ target, icon, iconColor, text, setIsOpen }) => {
  const closeSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen((prev) => !prev);
    }
  };

  return (
    <NavLink to={target}>
      <div
        className="flex gap-4 p-4 bg-base rounded-2xl items-center"
        onClick={closeSidebar}
      >
        <i className={`${icon} text-${iconColor} text-2xl pt-1`}></i>
        <span className="font-normal text-lg">{text}</span>
      </div>
    </NavLink>
  );
};

export default SidebarLink;

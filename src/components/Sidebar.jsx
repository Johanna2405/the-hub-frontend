import { NavLink } from "react-router";

const Sidebar = ({ isOpen, setIsOpen }) => {
  return (
    <div
      className={`bg-primary transform transition-all duration-300 
        fixed inset-0 z-50 h-full md:relative md:h-auto overflow-hidden
        ${
          isOpen
            ? "w-full md:w-2/4 lg:w-1/3 translate-x-0"
            : "w-0 md:w-0 -translate-x-full"
        }
      `}
    >
      <div className="flex justify-between p-4">
        <img src="./logoipsum-329.svg" alt="Logo" />
        <button
          className="btn bg-base border-none pt-1"
          onClick={() => setIsOpen(false)}
        >
          <i className="fi-br-arrow-left text-lg"></i>
        </button>
      </div>
      <div
        className={`p-4 flex flex-col gap-8 ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <h3>Apps</h3>
        <nav className="flex flex-col gap-4">
          <NavLink to={"/pinboard"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rr-text text-neon text-2xl pt-1"></i>
              <span className="font-normal text-lg">Posts</span>
            </div>
          </NavLink>
          <NavLink to={"/lists"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rs-list-check text-aquamarine text-2xl pt-1"></i>
              <span className="font-normal text-lg">Lists</span>
            </div>
          </NavLink>
          <NavLink to={"/messages"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rr-megaphone text-sage text-2xl pt-1"></i>
              <span className="font-normal text-lg">Messages</span>
            </div>
          </NavLink>
          <NavLink to={"/dailycalendar"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rr-calendar text-lilac text-2xl pt-1"></i>
              <span className="font-normal text-lg">Calendar</span>
            </div>
          </NavLink>
        </nav>
        <h3>Settings</h3>
        <div className="flex flex-col gap-4">
          <NavLink to={"/settings"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rr-settings-sliders text-text text-2xl pt-1"></i>
              <span className="font-normal text-lg">Profile Settings</span>
            </div>
          </NavLink>
          <NavLink to={"/community-settings"}>
            <div className="flex gap-4 p-4 bg-base rounded-2xl items-center">
              <i className="fi-rs-settings text-text text-2xl pt-1"></i>
              <span className="font-normal text-lg">Community Settings</span>
            </div>
          </NavLink>
        </div>
        {/* Add onClick to the button for sign out function */}
        <button className="flex items-center gap-4">
          <i className="fi fi-rr-exit text-text text-3xl bg-base rounded-xl px-3 pt-3 pb-1 "></i>
          <span className="font-bold text-xl">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

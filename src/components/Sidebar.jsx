import SidebarLink from "./SidebarLink";

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
          <SidebarLink
            target={"/pinboard"}
            icon={"fi-rr-text"}
            iconColor={"neon"}
            text={"Posts"}
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            target={"/lists"}
            icon={"fi-rs-list-check"}
            iconColor={"aquamarine"}
            text={"Lists"}
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            target={"/messages"}
            icon={"fi-rr-megaphone"}
            iconColor={"sage"}
            text={"Messages"}
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            target={"/calendartabs"}
            icon={"fi-rr-calendar"}
            iconColor={"lilac"}
            text={"Calendar"}
            setIsOpen={setIsOpen}
          />
        </nav>
        <h3>Settings</h3>
        <div className="flex flex-col gap-4">
          <SidebarLink
            target={"/profile-settings"}
            icon={"fi-rr-settings-sliders"}
            iconColor={"text"}
            text={"Profile Settings"}
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            target={"/community-settings"}
            icon={"fi-rs-settings"}
            iconColor={"text"}
            text={"Community Settings"}
            setIsOpen={setIsOpen}
          />
        </div>
        {/* Add onClick to the button for sign out function */}
        <button
          className="flex items-center gap-4"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          <i className="fi fi-rr-exit text-text text-2xl bg-base rounded-xl px-3 pt-3 pb-1 "></i>
          <span className="font-bold text-lg">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

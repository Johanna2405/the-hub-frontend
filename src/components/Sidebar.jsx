import SidebarLink from "./SidebarLink";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import CommunitySelector from "./CommunitySelector";
import { useNavigate } from "react-router";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const { pinboardSettings } = useUser();
  const {
    joinedCommunities,
    currentCommunity,
    setCurrentCommunity,
    settings,
    cleanUpCommunity,
    refreshJoinedCommunities,
  } = useCommunity();
  const { logout } = useUser();

  const sidebarLinks = [
    {
      icon: "fi-rr-text",
      iconColor: "neon",
      text: "Posts",
      settingKey: "posts",
      target: "posts",
    },
    {
      icon: "fi-rs-list-check",
      iconColor: "ultramarine",
      text: "Lists",
      settingKey: "lists",
      target: "lists",
    },
    {
      icon: "fi-rr-megaphone",
      iconColor: "sage",
      text: "Messages",
      settingKey: "messages",
      target: "messages",
    },
    {
      icon: "fi-rr-calendar",
      iconColor: "lilac",
      text: "Calendar",
      settingKey: "calendar",
      target: "events",
    },
  ];

  const handleLogout = () => {
    cleanUpCommunity();
    logout();
  };

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
        <img src="/hub-dark.svg" alt="Logo" className="w-32" />
        <button
          className="btn bg-base border-none pt-1"
          onClick={() => setIsOpen(false)}
        >
          <i className="fi-br-arrow-left text-lg"></i>
        </button>
      </div>
      <div
        className={`p-4 flex flex-col gap-8  ${
          isOpen ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        <div className="flex flex-col gap-4">
          {!currentCommunity && (
            <SidebarLink
              target={"/"}
              icon={"fi-rr-thumbtack"}
              iconColor={"ultramarine"}
              text={"Your Pinboard"}
              setIsOpen={setIsOpen}
              className={"bg-primary py-2"}
            />
          )}

          {currentCommunity && (
            <SidebarLink
              target={`/community/${currentCommunity.id}/pinboard`}
              icon={"fi-rr-thumbtack"}
              iconColor={"ultramarine"}
              text={"Community Pinboard"}
              setIsOpen={setIsOpen}
              className={"bg-primary py-2"}
            />
          )}
          <CommunitySelector
            communities={joinedCommunities}
            onSelect={(slug) => {
              const selected = joinedCommunities.find((c) => c.slug === slug);
              if (selected) {
                setCurrentCommunity(selected);
                navigate(`/community/${selected.id}/pinboard`);
              }
            }}
            refreshCommunities={refreshJoinedCommunities}
          />
        </div>
        <h3>Apps</h3>
        <nav className="flex flex-col gap-4">
          {sidebarLinks.map((link) => {
            const isInPrivateSpace = !currentCommunity;

            // Decide whether the link should render
            const shouldRender = isInPrivateSpace
              ? pinboardSettings[link.settingKey] &&
                link.settingKey !== "messages"
              : settings[link.settingKey];

            return (
              shouldRender && (
                <SidebarLink
                  key={link.text}
                  target={
                    currentCommunity
                      ? `/community/${currentCommunity.id}/${link.target}`
                      : `/${link.target}`
                  }
                  icon={link.icon}
                  iconColor={link.iconColor}
                  text={link.text}
                  setIsOpen={setIsOpen}
                />
              )
            );
          })}
        </nav>
        <h3>Settings</h3>
        <div className="flex flex-col gap-4">
          <SidebarLink
            target={"/settings"}
            icon={"fi-rr-settings-sliders"}
            iconColor={"text"}
            text={"Settings"}
            setIsOpen={setIsOpen}
          />
        </div>
        <button
          className="flex items-center gap-4 cursor-pointer"
          onClick={handleLogout}
        >
          <i className="fi fi-rr-exit text-text text-2xl bg-base rounded-xl px-3 pt-3 pb-1 "></i>
          <span className="font-bold text-lg">Sign out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

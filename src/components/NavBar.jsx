import { useCommunity } from "../context/CommunityContext";
import { useUser } from "../context/UserContext";
import IconBtn from "./IconBtn";

const NavBar = ({ isOpen, setIsOpen }) => {
  const { currentCommunity, cleanUpCommunity } = useCommunity();
  const { user, logout } = useUser();

  const handleLogout = () => {
    cleanUpCommunity();
    logout();
  };

  return (
    <nav className="flex items-center justify-between p-4 w-full bg-primary shadow-sm">
      <div className="flex items-center gap-4">
        <IconBtn
          icon="fi-rr-menu-burger"
          color="text"
          onClick={() => setIsOpen(!isOpen)}
        />
        {/* Add null check for currentCommunity */}
        <span className="font-semibold">
          {currentCommunity?.name || "Private Space"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>{user?.username || "Guest"}</span>
        <IconBtn icon="fi-rr-exit" color="text" onClick={handleLogout} />
      </div>
    </nav>
  );
};

export default NavBar;

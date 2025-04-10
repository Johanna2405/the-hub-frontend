import { useCommunity } from "../context/CommunityContext";
import { useUser } from "../context/UserContext";
import IconBtn from "./IconBtn";

const NavBar = ({ isOpen, setIsOpen }) => {
  const { currentCommunity } = useCommunity();
  const { user, logout } = useUser();

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
          {currentCommunity?.name || "No Community Selected"}
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span>{user?.username || "Guest"}</span>
        <IconBtn icon="fi-rr-exit" color="text" onClick={logout} />
      </div>
    </nav>
  );
};

export default NavBar;
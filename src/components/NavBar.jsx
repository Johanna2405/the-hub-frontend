import { useCommunity } from "../context/CommunityContext";
import { useUser } from "../context/UserContext";
import { Link } from "react-router";
import IconBtn from "./IconBtn";

const NavBar = ({ isOpen, setIsOpen }) => {
  const { currentCommunity, cleanUpCommunity } = useCommunity();
  const { user, logout } = useUser();

  const handleLogout = () => {
    cleanUpCommunity();
    logout();
  };

  return (
    <nav className="flex items-center justify-between p-4 w-full">
      <div className="flex items-center gap-4">
        {!isOpen && (
          <IconBtn
            icon="fi-rr-menu-burger"
            color="text"
            onClick={() => setIsOpen(!isOpen)}
          />
        )}

        {/* Add null check for currentCommunity */}
        <span className="text-xs lg:text-sm border-1 rounded-full px-2 py-1 border-lilac">
          {currentCommunity?.name || "Private Space"}
        </span>
      </div>

      <Link to={"/settings"} className="flex items-center gap-4">
        <span className="text-sm lg:text-sm font-semibold">
          {user?.username || "Guest"}
        </span>
        <img
          src={
            user?.profilePicture ? user.profilePicture : "/default-profile.png"
          }
          alt="Profile Picture"
          className="w-10 h-10 rounded-full"
        />
      </Link>
      {/* <IconBtn icon="fi-rr-exit" color="text" onClick={handleLogout} /> */}
    </nav>
  );
};

export default NavBar;

import { useState } from "react";
import { useCommunity } from "../context/CommunityContext";
import { useNavigate } from "react-router";

const CommunitySelector = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { joinedCommunities, currentCommunity, setCurrentCommunity } =
    useCommunity();

  const navigate = useNavigate();

  const handleSelect = (community) => {
    setCurrentCommunity(community);
    // navigate(`/c/${community.slug}`); check routing
    setDropdownOpen(false);
  };

  return (
    <div className="relative w-full">
      {/* Trigger */}
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="w-full flex justify-between items-center bg-primary p-3 rounded-2xl border border-base text-text"
      >
        <span>{currentCommunity?.name || "Select community"}</span>
        <span className="fi fi-rr-angle-small-down text-xl" />
      </button>

      {/* Dropdown */}
      {dropdownOpen && (
        <ul className="absolute z-10 mt-2 w-full bg-primary border border-base rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {joinedCommunities.map((community) => (
            <li
              key={community.id}
              className="flex justify-between items-center px-4 py-2 hover:bg-ultramarine hover:text-white cursor-pointer rounded-xl transition"
              onClick={() => handleSelect(community)}
            >
              <span>{community.name}</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  community.role === "admin"
                    ? "bg-lilac text-white"
                    : "bg-slate-200 text-slate-700"
                }`}
              >
                {community.role}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CommunitySelector;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import IconBtn from "./IconBtn";
import { useCommunity } from "../context/CommunityContext";

const CommunitySelector = ({
  communities = [],
  onSelect,
  refreshCommunities,
}) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [selectedCommunity, setSelectedCommunity] = useState(null);
  const { currentCommunity, setCurrentCommunity } = useCommunity();

  const privateSpace = {
    id: null,
    name: "Private Space",
    slug: null,
    role: null,
  };

  useEffect(() => {
    setSelectedCommunity(currentCommunity);
  }, [currentCommunity]);

  const dropdownCommunities = [privateSpace, ...communities];

  const handleSelect = (community) => {
    setSelectedCommunity(community);
    setOpen(false);
    if (onSelect) onSelect(community?.slug);

    if (community?.id) {
      setCurrentCommunity(community);
      navigate(`/community/${community.id}/pinboard`);
    } else {
      setCurrentCommunity(null);
      navigate("/"); // Navigate to the home page if "Private Space" is selected.
    }
  };

  if (!communities || communities.length === 0) {
    return (
      <div className="text-sm text-gray-400 italic">
        You haven’t joined any communities yet.
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-sm">
      <div
        onClick={() => {
          if (!open) refreshCommunities?.();
          setOpen(!open);
        }}
        className="w-full text-text px-4 py-2 rounded-2xl flex justify-between items-center border border-lilac"
      >
        <span>
          {selectedCommunity
            ? selectedCommunity.name
            : currentCommunity?.name || "Select a community"}
        </span>
        <IconBtn icon={"fi-rr-angle-small-down text-xl pt-2"} color={"lilac"} />
      </div>

      {open && (
        <div className=" mt-2 w-full  border border-lilac rounded-2xl ">
          {dropdownCommunities.map((community) => (
            <button
              key={community.id ?? "private-space"}
              className="w-full px-4 py-3 text-left hover:bg-primary/80 hover:rounded-2xl transition flex items-center justify-between"
              onClick={() => handleSelect(community)}
            >
              <span className="text-text cursor-pointer">{community.name}</span>
              {community.role && (
                <span
                  className={`rounded-full border border-lilac px-4 py-1 text-xs`}
                >
                  {community.role}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommunitySelector;

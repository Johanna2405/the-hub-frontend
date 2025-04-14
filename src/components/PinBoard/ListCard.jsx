import { useEffect, useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useUser } from "../../context/UserContext";
import { fetchCommunityLists } from "../../utils/community";
import { updateCommunityPinBoard } from "../../utils/community";
import { fetchListItems, fetchListsPerUserId } from "../../utils/listsAPI";
import { useNavigate } from "react-router";

import IconBtn from "../IconBtn";

const ListCard = ({ onRemove, listIndex, index }) => {
  const { currentCommunity, pinBoard, setPinBoard } = useCommunity();
  const [lists, setLists] = useState([]);
  const [selectedList, setSelectedList] = useState(null);
  const [listItems, setListItems] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();
  const isCommunity = Boolean(currentCommunity?.id);

  const pinnedApps = !isCommunity
    ? JSON.parse(localStorage.getItem("pinnedApps")) || []
    : [];

  const listId = isCommunity
    ? pinBoard[listIndex]?.listId
    : JSON.parse(localStorage.getItem("pinnedApps"))?.[index]?.listId;

  // Load all available lists
  useEffect(() => {
    const loadLists = async () => {
      try {
        if (isCommunity && currentCommunity?.id) {
          const res = await fetchCommunityLists(currentCommunity.id);
          setLists(res);
          const found = res.find((l) => l.id === listId);
          if (found) setSelectedList(found);
        } else if (user?.id) {
          const res = await fetchListsPerUserId(user.id);
          setLists(res);
          const found = res.find((l) => l.id === listId);
          if (found) {
            setSelectedList(found);
          }
        }
      } catch (err) {
        console.error("Failed to load lists:", err);
      }
    };

    loadLists();
  }, [currentCommunity, listId, user]);

  // Set selected list in private space if listId matches
  useEffect(() => {
    if (!isCommunity && lists.length > 0 && listId) {
      const match = lists.find((l) => l.id === listId);
      if (match) {
        setSelectedList(match);
      }
    }
  }, [lists, listId, isCommunity]);

  // Load list items when a list is selected
  useEffect(() => {
    const loadItems = async () => {
      if (!selectedList) return;
      try {
        const items = await fetchListItems(selectedList.id);
        setListItems(items);
      } catch (err) {
        console.error("Failed to load list items:", err);
      }
    };

    loadItems();
  }, [selectedList]);

  const handleSelect = async (list) => {
    setSelectedList(list);
    setShowDropdown(false);

    const updated = isCommunity
      ? [...pinBoard]
      : JSON.parse(localStorage.getItem("pinnedApps")) || [];

    updated[listIndex] = {
      ...updated[listIndex],
      listId: list.id,
    };

    if (isCommunity) {
      setPinBoard(updated);
      try {
        await updateCommunityPinBoard(currentCommunity.id, updated);
        console.log("✅ Community pinboard updated");
      } catch (err) {
        console.error("Failed to save community pinboard:", err);
      }
    } else {
      try {
        localStorage.setItem("pinnedApps", JSON.stringify(updated));
        console.log("💾 Saved pinnedApps to localStorage:", updated);
      } catch (err) {
        console.error("Failed to save to localStorage:", err);
      }
    }
  };

  const visibleItems = expanded ? listItems : listItems.slice(0, 3);

  return (
    <div className="relative rounded-3xl p-4 transition-all duration-300 min-h-32 bg-primary text-text flex flex-col justify-between group mb-4">
      {/* Remove-Button */}
      <div className="absolute top-2 right-2 lg:opacity-0 opacity-40 group-hover:opacity-100 transition">
        <IconBtn icon="fi-br-cross-small" transparent onClick={onRemove} />
      </div>

      <div className="flex flex-col gap-2">
        <i className="fi-rr-list text-lg"></i>
        <h3>{selectedList?.title || "Pinned List"}</h3>

        {!selectedList && (
          <div className="flex flex-col gap-2">
            <p className="text-sm italic">No list selected</p>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowDropdown((prev) => !prev)}
              onKeyDown={(e) =>
                e.key === "Enter" && setShowDropdown((prev) => !prev)
              }
              className="btn border-none flex bg-white/40 text-text gap-2 w-fit px-3 py-1 rounded-xl cursor-pointer"
            >
              <i className="fi fi-rr-search pt-1 text-lg text-text" />
              <span className="font-semibold">Choose List</span>
            </div>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-white/40 p-2">
            {lists.length === 0 && <p className="text-sm">Loading...</p>}
            {lists.map((list) => (
              <div
                key={list.id}
                className="cursor-pointer p-1 hover:underline text-sm"
                onClick={() => handleSelect(list)}
              >
                {list.title || `List #${list.id}`}
              </div>
            ))}
          </div>
        )}

        {/* List content */}
        {selectedList && (
          <>
            {/* <p className="font-medium">{selectedList.title}</p> */}
            <ul className="space-y-1 text-sm mt-2">
              {visibleItems.map((item) => (
                <li key={item.id}>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="checkbox checkbox-xs border border-[#181B4D] text-[#181B4D] checked:border-[#181B4D] mr-2"
                      checked={item.is_completed}
                      readOnly
                    />
                    {item.name}
                  </label>
                </li>
              ))}
            </ul>

            {/* View full list */}
            {expanded && (
              <span
                className="mt-2 hover:underline text-sm font-bold cursor-pointer"
                onClick={() => {
                  if (isCommunity) {
                    navigate(`/community/${currentCommunity.id}/lists`);
                  } else {
                    navigate("/lists");
                  }
                }}
              >
                View full list
              </span>
            )}
          </>
        )}
      </div>

      {/* Expand toggle (always if a list is selected) */}
      {selectedList && (
        <div className="flex justify-end mt-4">
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="neon"
            transparent
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      )}
    </div>
  );
};

export default ListCard;

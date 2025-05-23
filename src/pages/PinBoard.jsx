import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { updateCommunityPinBoard } from "../utils/community";

import PostCard from "../components/PinBoard/PostCard";
import ListCard from "../components/PinBoard/ListCard";
import CardFilter from "../components/PinBoard/CardFilter";
import AppModal from "../components/PinBoard/AppModal";

const PinBoard = () => {
  const { user } = useUser();
  const { currentCommunity, pinBoard, setPinBoard, settings } = useCommunity();
  const [pinnedApps, setPinnedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const isCommunity = Boolean(currentCommunity?.id);
  const isAdmin = currentCommunity?.role === "admin";

  // Load private pinned apps from localStorage
  useEffect(() => {
    if (!isCommunity) {
      const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
      setPinnedApps(stored);
    }
  }, [isCommunity]);

  // Final list of pinned apps (format: [{ type: "post" }, ...])
  const activePinnedApps = isCommunity ? pinBoard : pinnedApps;

  // Add new app type to pinned apps
  const handleAddApp = async (type) => {
    const newEntry = { type };

    if (isCommunity) {
      const updated = [...pinBoard, newEntry];

      setPinBoard(updated);
      try {
        await updateCommunityPinBoard(currentCommunity.id, updated);
      } catch (err) {
        console.error("Failed to update community pinboard:", err);
      }
    } else {
      const updated = [...pinnedApps, newEntry];
      setPinnedApps(updated);
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }
  };

  // Remove app type from pinned apps
  const handleRemoveApp = async (indexToRemove) => {
    if (isCommunity) {
      const updated = pinBoard.filter((_, i) => i !== indexToRemove);
      setPinBoard(updated);
      try {
        await updateCommunityPinBoard(currentCommunity.id, updated);
      } catch (err) {
        console.error("Failed to update community pinboard:", err);
      }
    } else {
      const updated = pinnedApps.filter((_, i) => i !== indexToRemove);
      setPinnedApps(updated);
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }
  };

  // Select post for pinned app
  const handlePostSelect = async (index, postId) => {
    const updated = [...pinBoard];
    updated[index] = { ...updated[index], postId };

    setPinBoard(updated);

    try {
      await updateCommunityPinBoard(currentCommunity.id, updated);
    } catch (err) {
      console.error("Failed to update community pinboard:", err);
    }
  };

  const handleEventSelect = async (index, eventId) => {
    const updated = [...pinBoard];
    updated[index] = { ...updated[index], eventId };
    setPinBoard(updated);

    if (isCommunity) {
      try {
        await updateCommunityPinBoard(currentCommunity.id, updated);
      } catch (err) {
        console.error("Failed to update pinboard:", err);
      }
    } else {
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }
  };

  // Filter cards
  const filteredApps =
    selectedFilter === "all"
      ? activePinnedApps
      : activePinnedApps.filter((app) => app.type === selectedFilter);

  // Split filtered apps into two columns (A/B)
  const columnA = filteredApps.filter((_, index) => index % 2 === 0);
  const columnB = filteredApps.filter((_, index) => index % 2 !== 0);

  // Dynamically render correct Card Component
  // PinBoard.jsx
  const renderCard = (app, index) => {
    const onRemove = () => handleRemoveApp(index);
    const onSelectPost = (postId) => handlePostSelect(index, postId);
    const onSelectEvent = (eventId) => handleEventSelect(index, eventId);

    switch (app.type) {
      case "posts":
        return (
          <PostCard
            index={index}
            postId={app.postId}
            onRemove={onRemove}
            onSelectPost={onSelectPost}
          />
        );
      case "lists":
        return <ListCard index={index} onRemove={onRemove} listIndex={index} />;
      case "calendar":
        return (
          <EventCard
            index={index}
            eventId={app.eventId}
            onRemove={onRemove}
            onSelectEvent={onSelectEvent}
          />
        );
      default:
        return null;
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour >= 5 && hour < 12) {
      return "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Good Day";
    } else {
      return "Good Evening";
    }
  };

  return (
    <div className="flex flex-col">
      <h2 className="text-neon">Hello {user?.username}</h2>
      <div className="flex gap-4 justify-between w-full items-center pb-4">
        <h1 className="pt-2 !text-5xl md:!text-6xl">{getGreeting()}</h1>
        {/* App Modal always visible for admins or private space */}
        {(!isCommunity || isAdmin) && <AppModal onSelect={handleAddApp} />}
      </div>
      <div className="flex flex-col gap-4 ">
        <CardFilter
          selected={selectedFilter}
          onFilterChange={setSelectedFilter}
        />

        {filteredApps.length > 0 && (
          <div className="columns-2 md:columns-2 lg:columns-3 gap-4 w-full space-y-4">
            {filteredApps.map((app) => {
              const originalIndex = activePinnedApps.findIndex(
                (a) => a === app
              );
              if (originalIndex === -1) return null;
              return (
                <div key={originalIndex} className="break-inside-avoid">
                  {renderCard(app, originalIndex)}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default PinBoard;

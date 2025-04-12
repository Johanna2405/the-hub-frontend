import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { updateCommunityPinBoard } from "../utils/community";

import PostCard from "../components/PinBoard/PostCard";
import EventCard from "../components/PinBoard/EventCard";
import ListCard from "../components/PinBoard/ListCard";
import CardFilter from "../components/PinBoard/CardFilter";
import MessageCard from "../components/PinBoard/MessageCard";
import AppModal from "../components/PinBoard/AppModal";

const PinBoard = () => {
  const { user } = useUser();
  const { currentCommunity, pinBoard, setPinBoard, settings } = useCommunity();
  const [pinnedApps, setPinnedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  const isCommunity = Boolean(currentCommunity?.id);
  const isAdmin = currentCommunity?.role === "admin";

  console.log("📌 PinBoard Settings:", settings);

  useEffect(() => {
    if (isCommunity) {
      console.log("📌 PinBoard Settings:", currentCommunity?.settings);
      console.log("📌 PinBoard (raw):", pinBoard);
    }
  }, [currentCommunity, pinBoard]);

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
        console.error("❌ Failed to update community pinboard:", err);
      }
    } else {
      const updated = pinnedApps.filter((_, i) => i !== indexToRemove);
      setPinnedApps(updated);
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
  const renderCard = (app, index) => {
    const onRemove = () => handleRemoveApp(index);

    switch (app.type) {
      case "posts":
        return <PostCard postId={app.postId} onRemove={onRemove} />;
      case "lists":
        return <ListCard onRemove={onRemove} />;
      case "events":
        return <EventCard onRemove={onRemove} />;
      case "messages":
        return <MessageCard onRemove={onRemove} />;
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
    <div className="container mx-auto flex flex-col w-1/2 items-center justify-center gap-4">
      <h2 className="text-neon">Hello {user?.username}</h2>
      <h1>{getGreeting()}</h1>

      <CardFilter
        selected={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {filteredApps.length > 0 && (
        <div className="flex gap-4 w-full justify-center">
          {/* Column A */}
          <div className="flex flex-col w-1/2">
            {columnA.map((app, index) => (
              <div key={index}>{renderCard(app, index)}</div>
            ))}
          </div>

          {/* Column B */}
          <div className="flex flex-col w-1/2">
            {columnB.map((app, index) => (
              <div key={index}>{renderCard(app, index + columnA.length)}</div>
            ))}
          </div>
        </div>
      )}

      {/* App Modal always visible for admins or private space */}
      {(!isCommunity || isAdmin) && <AppModal onSelect={handleAddApp} />}
    </div>
  );
};

export default PinBoard;

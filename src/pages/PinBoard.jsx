import { useEffect, useState } from "react";

import PostCard from "../components/PinBoard/PostCard";
import EventCard from "../components/PinBoard/EventCard";
import ListCard from "../components/PinBoard/ListCard";
import CardFilter from "../components/PinBoard/CardFilter";
import MessageCard from "../components/PinBoard/MessageCard";
import AppModal from "../components/PinBoard/AppModal";

const PinBoard = () => {
  const [pinnedApps, setPinnedApps] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
    setPinnedApps(stored);
  }, []);

  // Load pinned apps from local storage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
    setPinnedApps(stored);
  }, []);

  // Add new app type to pinned apps
  const handleAddApp = (type) => {
    const updated = [...pinnedApps, { type }];
    setPinnedApps(updated);
    localStorage.setItem("pinnedApps", JSON.stringify(updated));
  };

  // Filter cards
  const filteredApps =
    selectedFilter === "all"
      ? pinnedApps
      : pinnedApps.filter((app) => app.type === selectedFilter);

  // Split filtered apps into two columns (A/B)
  const columnA = filteredApps.filter((_, index) => index % 2 === 0);
  const columnB = filteredApps.filter((_, index) => index % 2 !== 0);

  // Dynamically render correct Card Component
  const renderCard = (type) => {
    switch (type) {
      case "post":
        return <PostCard />;
      case "list":
        return <ListCard />;
      case "event":
        return <EventCard />;
      case "message":
        return <MessageCard />;
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
    <div className="container mx-auto flex flex-col items-center justify-center gap-4">
      <h2 className="text-neon">Hello username</h2>
      <h1>{getGreeting()}</h1>

      <CardFilter
        selected={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {pinnedApps.length === 0 && <AppModal onSelect={handleAddApp} />}

      {filteredApps.length > 0 && (
        <div className="flex gap-4 w-full justify-center">
          {/* Column A */}
          <div className="flex flex-col w-1/2">
            {columnA.map((app, index) => (
              <div key={index}>{renderCard(app.type)}</div>
            ))}
          </div>

          {/* Column B */}
          <div className="flex flex-col w-1/2">
            {columnB.map((app, index) => (
              <div key={index}>{renderCard(app.type)}</div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinBoard;

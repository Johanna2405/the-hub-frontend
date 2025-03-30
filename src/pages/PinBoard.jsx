import { useEffect, useState } from "react";

import PostCard from "../components/PinBoard/PostCard";
import EventCard from "../components/PinBoard/EventCard";
import ListCard from "../components/PinBoard/ListCard";
import CardFilter from "../components/PinBoard/CardFilter";
import MessageCard from "../components/PinBoard/MessageCard";
import AppModal from "../components/PinBoard/AppModal";

const PinBoard = () => {
  const [pinnedApps, setPinnedApps] = useState([]);

  // Load pinned apps from local storage on first render
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
    setPinnedApps(stored);
  }, []);

  // Add new app type to pinned apps
  const handleAddApp = (type) => {
    if (pinnedApps.includes(type)) return; // Prevent duplicates

    const updated = [...pinnedApps, type];
    setPinnedApps(updated);
    localStorage.setItem("pinnedApps", JSON.stringify(updated));
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
      <CardFilter />

      {/* Always show the modal trigger */}
      <AppModal onSelect={handleAddApp} />

      {/* Grid rendering (if apps exist) */}
      {pinnedApps.length > 0 && (
        <div className="flex w-full px-4 gap-4 mt-4">
          {/* Column A */}
          <div className="flex flex-col w-1/2 gap-4">
            {pinnedApps
              .filter((_, i) => i % 2 === 0)
              .map((app, index) => (
                <div key={`A-${index}`}>
                  {app === "list" && <ListCard />}
                  {app === "event" && <EventCard />}
                  {app === "post" && <PostCard />}
                  {app === "message" && <MessageCard />}
                </div>
              ))}
          </div>

          {/* Column B */}
          <div className="flex flex-col w-1/2 gap-4">
            {pinnedApps
              .filter((_, i) => i % 2 === 1)
              .map((app, index) => (
                <div key={`B-${index}`}>
                  {app === "list" && <ListCard />}
                  {app === "event" && <EventCard />}
                  {app === "post" && <PostCard />}
                  {app === "message" && <MessageCard />}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinBoard;

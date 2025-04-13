import { useEffect, useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import IconBtn from "../IconBtn";
import { fetchEvents } from "../../utils/calendarAPI";

const EventCard = ({ onRemove, index }) => {
  const { currentCommunity, pinBoard, setPinBoard } = useCommunity();
  const { user } = useUser();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const isCommunity = Boolean(currentCommunity?.id);

  const pinnedApps = !isCommunity
    ? JSON.parse(localStorage.getItem("pinnedApps")) || []
    : [];

  const eventId = isCommunity
    ? pinBoard[index]?.eventId
    : pinnedApps[index]?.eventId;

  // Fetch events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        let result = [];

        if (isCommunity && currentCommunity?.id) {
          // Placeholder: später Filter nach community_id
          console.log("🌐 Fetching events for community (not implemented)");
          result = []; // backend liefert nix, wenn nicht verknüpft
        } else {
          console.log("👤 Fetching events for user...");
          result = await fetchEvents();
        }

        setEvents(result);

        if (eventId) {
          const found = result.find((e) => e.id === eventId);
          if (found) setSelectedEvent(found);
        }
      } catch (err) {
        console.error("❌ Failed to fetch events:", err);
      }
    };

    loadEvents();
  }, [user, currentCommunity]);

  const handleSelect = (event) => {
    setSelectedEvent(event);
    setShowDropdown(false);

    // Update PinBoard
    const updated = isCommunity ? [...pinBoard] : [...pinnedApps];
    updated[index] = { ...updated[index], eventId: event.id };

    if (isCommunity) {
      setPinBoard(updated);
      // no updateCommunityPinBoard call -> implement bei Bedarf
    } else {
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }

    console.log("✅ Selected event:", event);
  };

  const formattedDate = selectedEvent
    ? new Date(selectedEvent.date).toLocaleDateString("de-DE")
    : null;

  return (
    <div className="relative group rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-lilac text-[#181B4D] flex flex-col justify-between">
      {/* Remove-Button */}
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
        <IconBtn icon="fi fi-br-cross" transparent onClick={onRemove} />
      </div>

      <div>
        <i className="fi-rr-calendar"></i>
        <h2 className="font-bold text-lg mb-2">
          {selectedEvent?.title || "Pinned Event"}
        </h2>

        {/* No event selected */}
        {!selectedEvent && (
          <div className="flex flex-col gap-2">
            <p className="text-sm italic">No event selected</p>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowDropdown((prev) => !prev)}
              onKeyDown={(e) =>
                e.key === "Enter" && setShowDropdown((prev) => !prev)
              }
              className="btn border-none flex bg-lilac text-text gap-2 w-fit px-3 py-1 rounded-xl cursor-pointer"
            >
              <i className="fi fi-rr-search pt-1 text-lg text-text" />
              <span className="font-semibold">Choose Event</span>
            </div>
          </div>
        )}

        {/* Dropdown */}
        {showDropdown && (
          <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-white/40 p-2">
            {events.length === 0 ? (
              <p className="text-sm italic">No events found</p>
            ) : (
              events.map((event) => (
                <div
                  key={event.id}
                  className="cursor-pointer p-1 hover:underline text-sm"
                  onClick={() => handleSelect(event)}
                >
                  {event.title}
                </div>
              ))
            )}
          </div>
        )}

        {/* Selected Event */}
        {selectedEvent && (
          <>
            <div className="flex flex-col rounded-2xl bg-white/30 p-2 mb-2">
              <p className="text-sm">{formattedDate}</p>
              <p className="font-medium">{selectedEvent.title}</p>
            </div>

            {expanded && selectedEvent.description && (
              <p className="text-sm">{selectedEvent.description}</p>
            )}

            {expanded && (
              <div className="mt-2">
                <h3
                  className="text-sm font-medium hover:underline cursor-pointer"
                  onClick={() =>
                    navigate(
                      isCommunity
                        ? `/community/${currentCommunity.id}/events`
                        : "/events"
                    )
                  }
                >
                  View more
                </h3>
              </div>
            )}
          </>
        )}
      </div>

      {/* Expand Toggle */}
      {selectedEvent && (
        <div className="flex justify-end mt-2">
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="lilac"
            transparent
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      )}
    </div>
  );
};

export default EventCard;

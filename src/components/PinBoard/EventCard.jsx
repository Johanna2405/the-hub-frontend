import { useEffect, useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import {
  fetchEvents,
  fetchCommunityEvents,
  fetchCommunityPinBoard,
  updateCommunityPinBoard,
} from "../../utils/calendarAPI";
import IconBtn from "../IconBtn";

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
    const loadEventsAndPin = async () => {
      try {
        let fetchedEvents = [];

        if (isCommunity && currentCommunity?.id) {
          fetchedEvents = await fetchCommunityEvents(currentCommunity.id);
          const res = await fetchCommunityPinBoard(currentCommunity.id);
          const pins = res.pin_board || [];

          const pinned = pins[index];
          if (pinned?.type === "calendar" && pinned.eventId) {
            const pinnedEvent = fetchedEvents.find(
              (e) => e.id === pinned.eventId
            );
            if (pinnedEvent) setSelectedEvent(pinnedEvent);
          }
        } else {
          fetchedEvents = await fetchEvents();
          const localPinned = pinnedApps[index];
          if (localPinned?.eventId) {
            const pinnedEvent = fetchedEvents.find(
              (e) => e.id === localPinned.eventId
            );
            if (pinnedEvent) setSelectedEvent(pinnedEvent);
          }
        }

        setEvents(fetchedEvents);
      } catch (err) {
        console.error("Failed to load events or pins:", err);
      }
    };

    loadEventsAndPin();
  }, [user, currentCommunity]);

  const handleSelect = async (event) => {
    setSelectedEvent(event);
    setShowDropdown(false);

    const updated = isCommunity ? [...pinBoard] : [...pinnedApps];
    updated[index] = { ...updated[index], eventId: event.id, type: "calendar" };

    if (isCommunity) {
      try {
        await updateCommunityPinBoard(currentCommunity.id, updated);
        setPinBoard(updated);
      } catch (err) {
        console.error("Failed to update community pin:", err);
      }
    } else {
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }
  };

  const formattedDate = selectedEvent
    ? new Date(selectedEvent.date).toLocaleDateString("de-DE")
    : null;

  return (
    <div className="relative group rounded-3xl p-6 transition-all duration-300 min-h-32 bg-lilac text-text flex flex-col justify-between">
      {/* Remove-Button */}
      <div className="absolute top-2 right-2 lg:opacity-0 opacity-40 group-hover:opacity-100 transition">
        <IconBtn icon="fi-br-cross-small" transparent onClick={onRemove} />
      </div>

      <div className="flex flex-col gap-2">
        <i className="fi-rr-calendar text-2xl"></i>
        <h3>{selectedEvent?.title || "Pinned Event"}</h3>

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
                <span
                  className="mt-2 hover:underline text-sm font-bold cursor-pointer"
                  onClick={() =>
                    navigate(
                      isCommunity
                        ? `/community/${currentCommunity.id}/events`
                        : "/events"
                    )
                  }
                >
                  View more
                </span>
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

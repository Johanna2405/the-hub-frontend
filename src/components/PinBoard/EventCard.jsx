import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const EventCard = () => {
  const [expanded, setExpanded] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("de-DE");

  return (
    <div className="flex flex-col bg-lilac gap-2 p-4 m-4 rounded-3xl max-w-64 shadow">
      <h2>Upcoming Events</h2>

      {/* Event element, later to be rendered for each calender item or up to e.g. 5 at once */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white/30 p-4">
        <p>
          <span className="text-base">{formattedDate}</span>
        </p>
        <p>Event Title</p>
      </div>

      {/* Event element, later to be rendered for each calender item or up to e.g. 5 at once */}
      <div className="flex flex-col gap-2 rounded-2xl bg-white/30 p-4">
        <p>
          <span className="text-base">{formattedDate}</span>
        </p>
        <p>Event Title</p>
      </div>

      {/* Expanded part of the EventCard */}
      {expanded && (
        <h3 className="text-sm font-medium text-[#181B4D]">
          <a href="#" className="">
            View more
          </a>
        </h3>
      )}
      <div className="flex justify-end">
        <button
          className="text-[#181B4D] btn btn-square btn-ghost hover:text-white"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
      </div>
    </div>
  );
};

export default EventCard;

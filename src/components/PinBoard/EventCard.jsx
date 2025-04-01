import { useState } from "react";
import IconBtn from "../IconBtn";

const EventCard = () => {
  const [expanded, setExpanded] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("de-DE");

  return (
    <div className="rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-lilac text-[#181B4D] flex flex-col justify-between">
      <div>
        <i className="fi-rr-calendar"></i>
        <h2 className="font-bold text-lg mb-2">Upcoming Events</h2>

        {/* Event 1 */}
        <div className="flex flex-col rounded-2xl bg-white/30 p-2 mb-2">
          <p className="text-sm">{formattedDate}</p>
          <p className="font-medium">Banana Gathering</p>
        </div>

        {/* Event 2 (nur bei expanded) */}
        {expanded && (
          <div className="flex flex-col rounded-2xl bg-white/30 p-2 mb-2">
            <p className="text-sm">{formattedDate}</p>
            <p className="font-medium">Pineapple Picnic</p>
          </div>
        )}

        {/* Optionaler Link */}
        {expanded && (
          <div className="mt-2">
            <a
              href="#"
              className="text-sm font-medium hover:underline text-[#181B4D]"
            >
              View more
            </a>
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <div className="flex justify-end mt-2">
        <button onClick={() => setExpanded(!expanded)}>
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="lilac"
            transparent
          />
        </button>
      </div>
    </div>
  );
};

export default EventCard;

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const EventCard = () => {
  const [expanded, setExpanded] = useState(false);
  const today = new Date();
  const formattedDate = today.toLocaleDateString("de-DE");

  return (
    <div className="flex flex-col bg-lilac gap-2 p-4 m-4 rounded-3xl max-w-64 transition-all duration-300 min-h-[250px]">
      <i className="fi-rr-calendar"></i>
      <h2>Upcoming Events</h2>

      <div className="flex flex-col h-full justify-between">
        {/* First static event */}
        <div className="flex flex-col rounded-2xl bg-white/30 p-2">
          <p>
            <span className="text-base">{formattedDate}</span>
          </p>
          <p>Banana Gathering</p>
        </div>

        {/* Second static event, only visible if expanded */}
        {expanded && (
          <div className="flex flex-col rounded-2xl mt-2 bg-white/30 p-2">
            <p>
              <span className="text-base">{formattedDate}</span>
            </p>
            <p>Pineapple Picnic</p>
          </div>
        )}

        {/* Optionaler Link bei Expanded */}
        {expanded && (
          <h3 className="mt-2 hover:underline">
            <a href="#" className="">
              View more
            </a>
          </h3>
        )}

        {/* Expand Button */}
        <div className="flex justify-end">
          <button
            className="text-[#181B4D] btn btn-square btn-ghost hover:text-white"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

import { useState } from "react";
import { generateTimeOptions, getDaysInMonth } from "../../utils/helpers";
import { useUser } from "../../context/UserContext";
import { useCommunity } from "../../context/CommunityContext";
import { createEvent } from "../../utils/calendarAPI";

const NewEventModal = ({
  show,
  onClose,
  onDayChange,
  selectedDay,
  onEventCreated,
}) => {
  const [day, setDay] = useState(selectedDay || "");
  const [month, setMonth] = useState("03");
  const [year, setYear] = useState("2025");
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Private");
  const [location, setLocation] = useState("");
  const { user } = useUser();
  const { currentCommunity } = useCommunity();

  if (!show) return null;

  const timeOptions = generateTimeOptions();

  const resetForm = () => {
    setDay("");
    setMonth("03");
    setYear("2025");
    setTitle("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setType("Private");
    setLocation("");
    onClose();
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      const user_id = user.id;
      let community_id = currentCommunity?.id;

      if (type === "Private") {
        community_id = null;
      } else if (type === "Community" && currentCommunity) {
        community_id = currentCommunity.id;
      }

      if (!startTime || !endTime) {
        alert("Start and end time are required.");
        return;
      }

      if (startTime >= endTime) {
        alert("End time must be after start time.");
        return;
      }

      const date = `${year}-${month}-${day}`;
      const start_time = new Date(`${date}T${startTime}:00`).toISOString();
      const end_time = new Date(`${date}T${endTime}:00`).toISOString();

      const eventPayload = {
        user_id,
        title,
        date,
        start_time,
        end_time,
        description,
        location,
        type,
        community_id,
      };

      await createEvent(eventPayload);

      if (onEventCreated) onEventCreated();

      resetForm();
    } catch (e) {
      console.error("Error creating list:", e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-90 flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">New Event</h2>
          <button onClick={onClose}>
            <i className="fi-br-cross text-text text-lg"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-3 gap-2">
            <div>
              <label className="block text-text font-medium">Day</label>
              <select
                value={day}
                onChange={(e) => {
                  setDay(e.target.value);
                  onDayChange(e.target.value);
                }}
                className="select select-bordered w-full bg-primary text-text"
                required
              >
                <option value="" disabled>
                  Select day
                </option>
                {Array.from(
                  { length: getDaysInMonth(Number(year), Number(month)) },
                  (_, i) => (
                    <option key={i} value={(i + 1).toString().padStart(2, "0")}>
                      {(i + 1).toString().padStart(2, "0")}
                    </option>
                  )
                )}
              </select>
            </div>
            <div>
              <label className="block text-text font-medium">Month</label>
              <select
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                className="select select-bordered w-full bg-primary text-text"
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option
                    key={i + 1}
                    value={(i + 1).toString().padStart(2, "0")}
                  >
                    {(i + 1).toString().padStart(2, "0")}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-text font-medium">Year</label>
              <select
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="select select-bordered w-full bg-primary text-text"
              >
                {Array.from({ length: 20 }, (_, i) => {
                  const yearOption = (new Date().getFullYear() + i).toString();
                  return (
                    <option key={yearOption} value={yearOption}>
                      {yearOption}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-text font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered w-full bg-primary text-text"
              placeholder="Event Title"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-text font-medium">Start Time</label>
              <select
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="select select-bordered w-full bg-primary text-text"
                required
              >
                <option value="" disabled>
                  Start Time
                </option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-text font-medium">End Time</label>
              <select
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="select select-bordered w-full bg-primary text-text"
                required
              >
                <option value="" disabled>
                  End Time
                </option>
                {timeOptions.map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-text font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="textarea textarea-bordered w-full bg-primary text-text"
              placeholder="Enter details"
            />
          </div>
          <div>
            <label className="block text-text font-medium">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="input input-bordered w-full bg-primary text-text"
              placeholder="e.g., Conference Room A"
            />
          </div>
          <div>
            <label className="block text-text font-medium">Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="select select-bordered w-full bg-primary text-text"
            >
              <option value="Private">Private</option>
              <option value="Community">Community</option>
            </select>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              className="btn btn-secondary text-text"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="btn bg-neon text-text">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewEventModal;

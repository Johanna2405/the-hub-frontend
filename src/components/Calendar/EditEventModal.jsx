import { useState, useEffect } from "react";
import { formatTime, getDaysInMonth } from "../../utils/helpers";

const EditEventModal = ({ show, onClose, onSave, event }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Private");
  const [location, setLocation] = useState("");
  const [startTime, setStartTime] = useState("09:00");
  const [endTime, setEndTime] = useState("10:00");
  const [day, setDay] = useState("01");
  const [month, setMonth] = useState("01");
  const [year, setYear] = useState(new Date().getFullYear().toString());

  const timeOptions = Array.from({ length: 24 }, (_, hour) => {
    const h = hour.toString().padStart(2, "0");
    return [`${h}:00`, `${h}:30`];
  }).flat();

  useEffect(() => {
    if (event) {
      setTitle(event.title || "");
      setDescription(event.description || "");
      setType(event.type || "Private");
      setLocation(event.location || "");

      if (event?.start_time && event?.end_time) {
        const start = new Date(event.start_time);
        const end = new Date(event.end_time);

        setStartTime(formatTime(start));
        setEndTime(formatTime(end));
      }

      if (event?.date) {
        const [yr, mo, dy] = event.date.split("-");
        setYear(yr);
        setMonth(mo);
        setDay(dy);
      }
    }
  }, [event]);

  useEffect(() => {
    const maxDay = getDaysInMonth(Number(year), Number(month));
    if (Number(day) > maxDay) {
      setDay(maxDay.toString().padStart(2, "0"));
    }
  }, [day, month, year]);

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: event.id,
      date: `${year}-${month}-${day}`,
      title,
      start_time: `${year}-${month}-${day}T${startTime}:00`,
      end_time: `${year}-${month}-${day}T${endTime}:00`,
      description,
      type,
      location,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-90 flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Edit Event</h2>
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
                onChange={(e) => setDay(e.target.value)}
                className="select select-bordered w-full bg-primary text-text"
              >
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
                {Array.from({ length: 50 }, (_, i) => {
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

          <div>
            <label className="block text-text font-medium">Start Time</label>
            <select
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="select select-bordered w-full bg-primary text-text"
              required
            >
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
              {timeOptions.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
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

export default EditEventModal;

const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      options.push(`${h}:${m}`);
    }
  }
  return options;
};
import { useState } from "react";

const AddEventModal = ({
  show,
  onClose,
  onSave,
  selectedDay,
  selectedMonth,
  selectedYear,
}) => {
  const [title, setTitle] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("Private");

  if (!show) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startTime || !endTime) {
      alert("Start and end time are required.");
      return;
    }
    if (startTime >= endTime) {
      alert("End time must be after start time.");
      return;
    }
    const time = `${startTime} - ${endTime}`;
    onSave({ title, time, description, type, day: selectedDay });
    setTitle("");
    setStartTime("");
    setEndTime("");
    setDescription("");
    setType("Private");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm bg-opacity-90 flex items-center justify-center">
      <div className="bg-base-100 rounded-2xl p-6 w-full max-w-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-text">Add Additional Event</h2>
          <button onClick={onClose}>
            <i className="fi-br-cross text-text text-lg"></i>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-text font-medium">Day</label>
            <input
              type="text"
              value={
                selectedDay && selectedMonth !== undefined && selectedYear
                  ? `${selectedDay}/${(selectedMonth + 1)
                      .toString()
                      .padStart(2, "0")}/${selectedYear}`
                  : ""
              }
              className="input input-bordered w-full bg-primary text-text"
              disabled
            />
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
                {generateTimeOptions().map((t) => (
                  <option key={t} value={t}>
                    {t}
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
                {generateTimeOptions().map((t) => (
                  <option key={t} value={t}>
                    {t}
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

export default AddEventModal;

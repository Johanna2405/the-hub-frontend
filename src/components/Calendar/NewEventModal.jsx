// src/components/Calendar/NewEventModal.jsx
import { useState } from "react";

const NewEventModal = ({ show, onClose, onSave, onDayChange, selectedDay }) => {
    const [day, setDay] = useState(selectedDay || "");
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Private");
    const [location, setLocation] = useState(""); // Added location field

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({ day, title, time, description, type, location });
        setDay("");
        setTitle("");
        setTime("");
        setDescription("");
        setType("Private");
        setLocation(""); // Reset location
        onClose();
    };

    const days = Array.from({ length: 28 }, (_, i) => ({
        value: (i + 1).toString().padStart(2, "0"),
        label: (i + 1).toString().padStart(2, "0"),
    }));

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
                                Select a day
                            </option>
                            {days.map((d) => (
                                <option key={d.value} value={d.value}>
                                    {d.label}/03/2025
                                </option>
                            ))}
                        </select>
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
                        <label className="block text-text font-medium">Time</label>
                        <input
                            type="text"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            className="input input-bordered w-full bg-primary text-text"
                            placeholder="e.g., 12:00 - 14:00"
                            required
                        />
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
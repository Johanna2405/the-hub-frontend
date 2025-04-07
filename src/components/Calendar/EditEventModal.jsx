// src/components/Calendar/EditEventModal.jsx
import { useState, useEffect } from "react";

const EditEventModal = ({ show, onClose, onSave, event }) => {
    const [title, setTitle] = useState("");
    const [time, setTime] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("Private");
    const [location, setLocation] = useState(""); // Added location field

    useEffect(() => {
        if (event) {
            setTitle(event.title || "");
            setTime(event.time || "");
            setDescription(event.description || "");
            setType(event.type || "Private");
            setLocation(event.location || ""); // Set location
        }
    }, [event]);

    if (!show) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave({
            id: event.id,
            day: event.day,
            title,
            time,
            description,
            type,
            location, // Include location
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
                    <div>
                        <label className="block text-text font-medium">Day</label>
                        <input
                            type="text"
                            value={event.day ? `${event.day}/03/2025` : ""}
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

export default EditEventModal;
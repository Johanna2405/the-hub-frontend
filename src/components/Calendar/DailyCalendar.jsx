// src/components/Calendar/DailyCalendar.jsx
import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import EditEventModal from "./EditEventModal";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";

const DailyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selectedDay, setSelectedDay] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const allEvents = await fetchEvents();
                setEvents(allEvents);
                localStorage.setItem("daily_events", JSON.stringify(allEvents));
            } catch (err) {
                const fallback = localStorage.getItem("daily_events");
                if (fallback) setEvents(JSON.parse(fallback));
            } finally {
                setLoading(false);
            }
        };
        loadEvents();
    }, []);

    const validateTimeFormat = (time) => /^\d{2}:\d{2}\s*-\s*\d{2}:\d{2}$/.test(time);

    const handleAddEvent = async (newEvent) => {
        try {
            if (!validateTimeFormat(newEvent.time)) throw new Error("Invalid time format. Use 'HH:mm - HH:mm'.");

            const [start, end] = newEvent.time.split("-").map(t => t.trim());
            const startTime = `2025-03-${newEvent.day}T${start}:00`;
            const endTime = `2025-03-${newEvent.day}T${end}:00`;

            if (isNaN(Date.parse(startTime)) || isNaN(Date.parse(endTime))) throw new Error("Invalid time values.");

            const payload = {
                user_id: user?.id || null,
                title: newEvent.title,
                description: newEvent.description,
                type: newEvent.type,
                date: `2025-03-${newEvent.day}`,
                start_time: startTime,
                end_time: endTime,
                location: newEvent.location || "Not specified",
            };

            const saved = await createEvent(payload);
            const updated = [...events, saved];
            setEvents(updated);
            localStorage.setItem("daily_events", JSON.stringify(updated));
            setSelectedDay(newEvent.day);
        } catch (err) {
            alert(err.message || "Failed to add event");
        }
    };

    const handleEditEvent = async (updatedEvent) => {
        try {
            if (!validateTimeFormat(updatedEvent.time)) throw new Error("Invalid time format. Use 'HH:mm - HH:mm'.");

            const [start, end] = updatedEvent.time.split("-").map(t => t.trim());
            const startTime = `2025-03-${updatedEvent.day}T${start}:00`;
            const endTime = `2025-03-${updatedEvent.day}T${end}:00`;

            const payload = {
                user_id: user?.id || null,
                title: updatedEvent.title,
                description: updatedEvent.description,
                type: updatedEvent.type,
                date: `2025-03-${updatedEvent.day}`,
                start_time: startTime,
                end_time: endTime,
                location: updatedEvent.location || "Not specified",
            };

            const result = await updateEvent(updatedEvent.id, payload);
            const updated = events.map((e) => (e.id === updatedEvent.id ? result : e));
            setEvents(updated);
            localStorage.setItem("daily_events", JSON.stringify(updated));
        } catch (err) {
            alert(err.message || "Failed to update event");
        }
    };

    const handleDeleteEvent = async (eventId) => {
        try {
            await deleteEvent(eventId);
            const filtered = events.filter((e) => e.id !== eventId);
            setEvents(filtered);
            localStorage.setItem("daily_events", JSON.stringify(filtered));
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    const days = [
        { day: "22", label: "Sat" },
        { day: "23", label: "Sun" },
        { day: "24", label: "Mon" },
        { day: "25", label: "Tue" },
        { day: "26", label: "Wed" },
        { day: "27", label: "Thu" },
        { day: "28", label: "Fri" },
        { day: "29", label: "Sat" },
        { day: "30", label: "Sun" },
    ];

    return (
        <div className="p-4 bg-base">
            <Header showBackButton={true} onBack={() => navigate(-1)} />
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <IconBtn color="neon" icon="fi-rr-plus-small" onClick={() => setShowNewEventModal(true)} />
            </div>
            <div className="flex items-center justify-between mb-8">
                <IconBtn color="primary" icon="fi-rr-angle-small-left" onClick={onPrev} />
                <h2 className="text-xl font-semibold text-text">Day</h2>
                <IconBtn color="primary" icon="fi-rr-angle-small-right" onClick={onNext} />
            </div>
            <div className="flex gap-2 overflow-x-auto mb-6">
                {days.map(({ day, label }) => (
                    <div
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 w-16 min-w-[64px] ${selectedDay === day ? "bg-primary text-base" : "bg-base"
                            }`}
                    >
                        <span className="text-text font-bold text-lg">{day}</span>
                        <span className="text-lilac font-semibold text-sm">03</span>
                        <span className="text-sm text-text">{label}</span>
                    </div>
                ))}
            </div>
            {loading ? (
                <div className="flex flex-col gap-4 items-center py-8 w-full">
                    <span className="loading loading-spinner loading-lg text-lilac mb-6"></span>
                    <div className="w-full max-w-xl space-y-4 animate-pulse">
                        <div className="h-6 bg-base rounded w-1/3"></div>
                        <div className="h-4 bg-base rounded w-2/3"></div>
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4">
                    {events
                        .filter((event) => event.date?.endsWith(selectedDay))
                        .map((event) => (
                            <div
                                key={event.id}
                                className="bg-primary rounded-2xl p-7 hover:border-2 hover:border-ultramarine"
                            >
                                <div className="flex items-center justify-between">
                                    <p className="text-md text-text font-medium">
                                        {new Date(event.start_time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        -{" "}
                                        {new Date(event.end_time).toLocaleTimeString([], {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${event.type === "Private"
                                                    ? "border border-secondary text-secondary"
                                                    : "border border-text text-text"
                                                }`}
                                        >
                                            {event.type}
                                        </span>
                                        <IconBtn
                                            color="base"
                                            icon="fi-rr-pencil"
                                            onClick={() => {
                                                setCurrentEvent({
                                                    ...event,
                                                    time: `${new Date(event.start_time).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })} - ${new Date(event.end_time).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}`,
                                                    day: event.date.split("-")[2],
                                                });
                                                setShowEditEventModal(true);
                                            }}
                                        />
                                        <IconBtn
                                            color="error"
                                            icon="fi-rr-trash"
                                            onClick={() => handleDeleteEvent(event.id)}
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-text mt-2">{event.title}</h3>
                                <p className="text-text text-sm mt-1">{event.description}</p>
                                <div className="flex gap-2 items-center text-text mt-1">
                                    <i className="fi-rr-home-location text-md"></i>
                                    <span className="text-sm">{event.location || "Not specified"}</span>
                                </div>
                            </div>
                        ))}
                </div>
            )}
            <NewEventModal
                show={showNewEventModal}
                onClose={() => setShowNewEventModal(false)}
                onSave={handleAddEvent}
                onDayChange={setSelectedDay}
                selectedDay={selectedDay}
            />
            <EditEventModal
                show={showEditEventModal}
                onClose={() => setShowEditEventModal(false)}
                onSave={handleEditEvent}
                event={currentEvent}
            />
        </div>
    );
};

export default DailyCalendar;
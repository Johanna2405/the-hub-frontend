import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import {
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
} from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";

const MonthlyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selectedDay, setSelectedDay] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const days = Array.from({ length: 28 }, (_, i) => {
        const date = new Date(2025, 2, i + 1);
        const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
        return {
            day: (i + 1).toString().padStart(2, "0"),
            label: dayName,
        };
    });

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const allEvents = await fetchEvents();
                setEvents(allEvents);
                localStorage.setItem("monthly_events", JSON.stringify(allEvents));
            } catch (err) {
                const cached = localStorage.getItem("monthly_events");
                if (cached) setEvents(JSON.parse(cached));
            }
        };
        loadEvents();
    }, []);

    const handleAddEvent = async (newEvent) => {
        try {
            const [start, end] = newEvent.time.split("-").map((t) => t.trim());
            const startTime = `2025-03-${newEvent.day}T${start}:00`;
            const endTime = `2025-03-${newEvent.day}T${end}:00`;

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
            localStorage.setItem("monthly_events", JSON.stringify(updated));
            setSelectedDay(newEvent.day);
        } catch (err) {
            alert(err.message || "Failed to add event");
        }
    };

    const handleAddAdditionalEvent = async (newEvent) => {
        await handleAddEvent(newEvent);
    };

    const handleEditEvent = async (updatedEvent) => {
        try {
            const [start, end] = updatedEvent.time.split("-").map((t) => t.trim());
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

            if (!payload.start_time || !payload.end_time) {
                throw new Error("Start time and End time are required.");
            }

            const result = await updateEvent(updatedEvent.id, payload);
            const updated = events.map((e) =>
                e.id === updatedEvent.id ? result : e
            );
            setEvents(updated);
            localStorage.setItem("monthly_events", JSON.stringify(updated));
        } catch (err) {
            alert(err.message || "Failed to update event");
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            const filtered = events.filter((e) => e.id !== id);
            setEvents(filtered);
            localStorage.setItem("monthly_events", JSON.stringify(filtered));
        } catch (err) {
            alert("Failed to delete event");
        }
    };

    const groupedEvents = events.reduce((acc, event) => {
        const day = event.date.split("-")[2];
        if (!acc[day]) acc[day] = [];
        acc[day].push(event);
        return acc;
    }, {});

    return (
        <div className="p-4 bg-base">
            <Header showBackButton={true} onBack={() => navigate(-1)} />
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <IconBtn
                    color="neon"
                    icon="fi-rr-plus-small"
                    onClick={() => setShowNewEventModal(true)}
                />
            </div>
            <div className="flex items-center justify-between mb-4">
                <IconBtn color="primary" icon="fi-rr-angle-small-left" onClick={onPrev} />
                <h2 className="text-xl font-semibold text-text">Month</h2>
                <IconBtn color="primary" icon="fi-rr-angle-small-right" onClick={onNext} />
            </div>
            <div className="text-center text-lilac font-bold text-xl mb-4">March</div>
            <div className="grid grid-cols-7 gap-2 mb-8">
                {days.map((day) => (
                    <div
                        key={day.day}
                        onClick={() => setSelectedDay(day.day)}
                        className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 ${selectedDay === day.day ? "bg-primary text-base" : "bg-base"
                            }`}
                    >
                        <span className="text-text font-bold text-lg">{day.day}</span>
                        <span className="text-sm text-text">{day.label}</span>
                    </div>
                ))}
            </div>
            <div className="flex flex-col gap-4">
                {Object.entries(groupedEvents).map(([day, dayEvents]) => {
                    if (day !== selectedDay) return null;
                    return (
                        <div key={day} className={`rounded-3xl p-6 mb-4 bg-primary`}>
                            <div className="flex justify-between items-center mb-2">
                                <h3 className="font-bold text-text">
                                    {new Date(2025, 2, parseInt(day)).toLocaleDateString("en-GB", {
                                        weekday: "long",
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                    })}
                                </h3>
                            </div>
                            <div className="flex flex-col gap-4">
                                {dayEvents.map((event) => (
                                    <div
                                        key={event.id}
                                        className={`rounded-2xl p-6 hover:border-2 hover:border-ultramarine`}
                                    >
                                        <div className="flex justify-between gap-4">
                                            <div className="flex flex-col justify-between gap-2">
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
                                                <h3 className="text-xl font-bold text-text">
                                                    {event.title}
                                                </h3>
                                                <p className="text-text text-sm">{event.description}</p>
                                            </div>
                                            <div className="flex flex-col justify-between items-end gap-2">
                                                <span
                                                    className={`rounded-full px-3 py-1 text-sm ${event.type === "Private"
                                                        ? "border border-secondary text-secondary"
                                                        : "border border-text text-text"
                                                        }`}
                                                >
                                                    {event.type}
                                                </span>
                                                <div className="flex gap-2 items-center text-text">
                                                    <i className="fi-rr-home-location text-md"></i>
                                                    <span className="text-sm">
                                                        {event.location || "Not specified"}
                                                    </span>
                                                </div>
                                                <div className="flex gap-2">
                                                    <IconBtn
                                                        color="base"
                                                        icon="fi-rr-plus-small"
                                                        onClick={() => setShowAddEventModal(true)}
                                                    />
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            <NewEventModal
                show={showNewEventModal}
                onClose={() => setShowNewEventModal(false)}
                onSave={handleAddEvent}
                onDayChange={setSelectedDay}
                selectedDay={selectedDay}
            />
            <AddEventModal
                show={showAddEventModal}
                onClose={() => setShowAddEventModal(false)}
                onSave={handleAddAdditionalEvent}
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

export default MonthlyCalendar;
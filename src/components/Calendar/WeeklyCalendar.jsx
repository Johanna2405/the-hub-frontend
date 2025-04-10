// src/components/Calendar/WeeklyCalendar.jsx
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

const WeeklyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const { user } = useUser();
    const [selectedDay, setSelectedDay] = useState("25");
    const [expanded, setExpanded] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [currentDayForAddEvent, setCurrentDayForAddEvent] = useState(null);
    const [events, setEvents] = useState([]);

    const days = [
        { day: "22", label: "Sat" },
        { day: "23", label: "Sun" },
        { day: "24", label: "Mon" },
        { day: "25", label: "Tue" },
        { day: "26", label: "Wed" },
        { day: "27", label: "Thu" },
        { day: "28", label: "Fri" },
    ];

    useEffect(() => {
        const loadEvents = async () => {
            try {
                const all = await fetchEvents();
                setEvents(all);
                localStorage.setItem("weekly_events", JSON.stringify(all));
            } catch (err) {
                const fallback = localStorage.getItem("weekly_events");
                if (fallback) setEvents(JSON.parse(fallback));
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
            localStorage.setItem("weekly_events", JSON.stringify(updated));
            setSelectedDay(newEvent.day);
            setExpanded(newEvent.day);
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

            const result = await updateEvent(updatedEvent.id, payload);
            const updated = events.map((e) =>
                e.id === updatedEvent.id ? result : e
            );
            setEvents(updated);
            localStorage.setItem("weekly_events", JSON.stringify(updated));
        } catch (err) {
            alert(err.message || "Failed to update event");
        }
    };

    const handleDeleteEvent = async (id) => {
        try {
            await deleteEvent(id);
            const updated = events.filter((e) => e.id !== id);
            setEvents(updated);
            localStorage.setItem("weekly_events", JSON.stringify(updated));
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
            <div className="flex items-center justify-between mb-8">
                <IconBtn color="primary" icon="fi-rr-angle-small-left" onClick={onPrev} />
                <h2 className="text-xl font-semibold text-text">Week</h2>
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
            {groupedEvents[selectedDay] ? (
                <div className={`rounded-3xl p-6 mb-4 ${selectedDay === "25" ? "bg-secondary" : "bg-primary"}`}>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-bold text-text">
                            {new Date(2025, 2, parseInt(selectedDay)).toLocaleDateString("en-GB", {
                                weekday: "long",
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                            })}
                        </h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {groupedEvents[selectedDay].map((event) => (
                            <div
                                key={event.id}
                                className={`rounded-2xl p-4 flex justify-between items-center ${selectedDay === "25" ? "bg-[#F1DAFF]" : "bg-primary"
                                    }`}
                            >
                                <div>
                                    <p className="mb-1 !text-base">
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
                                    <h4 className="text-text text-xl font-light">{event.title}</h4>
                                    <p className="text-text text-sm mt-1">{event.description}</p>
                                </div>
                                <div className="flex gap-2 items-center">
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
                                        icon="fi-rr-plus-small"
                                        onClick={() => {
                                            setCurrentDayForAddEvent(selectedDay);
                                            setShowAddEventModal(true);
                                        }}
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
                        ))}
                        {selectedDay === "25" && (
                            <a
                                className="text-text font-bold mt-2 cursor-pointer"
                                onClick={() => navigate("/calendar/day")}
                            >
                                Go to Day
                            </a>
                        )}
                    </div>
                </div>
            ) : (
                <p className="text-text text-center">No events for this day.</p>
            )}
            <NewEventModal
                show={showNewEventModal}
                onClose={() => setShowNewEventModal(false)}
                onSave={handleAddEvent}
                onDayChange={(day) => {
                    setSelectedDay(day);
                    setExpanded(day);
                }}
                selectedDay={selectedDay}
            />
            <AddEventModal
                show={showAddEventModal}
                onClose={() => setShowAddEventModal(false)}
                onSave={handleAddAdditionalEvent}
                selectedDay={currentDayForAddEvent}
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

export default WeeklyCalendar;
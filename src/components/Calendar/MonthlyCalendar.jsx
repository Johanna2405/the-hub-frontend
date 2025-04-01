import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";

const MonthlyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);

    const days = Array.from({ length: 28 }, (_, i) => {
        const date = new Date(2025, 2, i + 1); // March 2025
        const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
        return {
            day: (i + 1).toString().padStart(2, "0"),
            label: dayName,
        };
    });

    const [events, setEvents] = useState(() => {
        const saved = localStorage.getItem("monthlyEvents");
        return saved ? JSON.parse(saved) : [
            {
                id: 1,
                time: "12:00 - 14:00",
                title: "Event title",
                description: "Description",
                type: "Private",
                day: "25",
            },
            {
                id: 2,
                time: "16:00 - 18:00",
                title: "Event title",
                description: "Description",
                type: "Community",
                day: "25",
            },
        ];
    });

    useEffect(() => {
        localStorage.setItem("monthlyEvents", JSON.stringify(events));
    }, [events]);

    const handleAddEvent = (newEvent) => {
        if (newEvent.day) {
            setSelectedDay(newEvent.day);
        }
        setEvents([...events, { ...newEvent, id: Date.now() }]);
    };

    const handleAddAdditionalEvent = (newEvent) => {
        setEvents([...events, { ...newEvent, id: Date.now() }]);
    };

    const handleEditEvent = (updatedEvent) => {
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
    };

    // Group events by day
    const groupedEvents = events.reduce((acc, event) => {
        const day = event.day;
        if (!acc[day]) {
            acc[day] = [];
        }
        acc[day].push(event);
        return acc;
    }, {});

    return (
        <div className="p-4 bg-base">
            {/* Header */}
            <Header showBackButton={true} onBack={() => navigate(-1)} />

            {/* Title and Add */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <IconBtn
                    color="neon"
                    icon="fi-rr-plus-small"
                    onClick={() => setShowNewEventModal(true)}
                />
            </div>

            {/* Month Selector */}
            <div className="flex items-center justify-between mb-4">
                <IconBtn
                    color="primary"
                    icon="fi-rr-angle-small-left"
                    onClick={onPrev}
                />
                <h2 className="text-xl font-semibold text-text">Month</h2>
                <IconBtn
                    color="primary"
                    icon="fi-rr-angle-small-right"
                    onClick={onNext}
                />
            </div>

            {/* Month Label */}
            <div className="text-center text-lilac font-bold text-xl mb-4">March</div>

            {/* Grid Calendar */}
            <div className="grid grid-cols-7 gap-2 mb-8">
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedDay(day.day)}
                        className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 ${selectedDay === day.day ? "bg-primary text-base" : "bg-base"
                            }`}
                    >
                        <span className="text-text font-bold text-lg">{day.day}</span>
                        <span className="text-sm text-text">{day.label}</span>
                    </div>
                ))}
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4">
                {Object.entries(groupedEvents).map(([day, dayEvents]) => {
                    // Only show events for the selected day
                    if (day !== selectedDay) return null;

                    const isToday = day === "25"; // Highlight today (for consistency with WeeklyCalendar)
                    const bg = isToday ? "bg-secondary" : "bg-primary";

                    // If only one event, display it without a date header
                    if (dayEvents.length === 1) {
                        const event = dayEvents[0];
                        return (
                            <div
                                key={event.id}
                                className={`rounded-2xl p-6 hover:border-2 hover:border-ultramarine ${bg}`}
                            >
                                <div className="flex justify-between gap-4">
                                    {/* Left side */}
                                    <div className="flex flex-col justify-between gap-2">
                                        <p className="text-md text-text font-medium">{event.time}</p>
                                        <h3 className="text-xl font-bold text-text">{event.title}</h3>
                                        <p className="text-text text-sm">{event.description}</p>
                                    </div>

                                    {/* Right side */}
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
                                            <span className="text-sm">Location</span>
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
                                                    setCurrentEvent(event);
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
                        )
                    }

                    // If multiple events, group them under a date header
                    return (
                        <div key={day} className={`rounded-3xl p-6 mb-4 ${bg}`}>
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
                                        className={`rounded-2xl p-6 hover:border-2 hover:border-ultramarine ${bg}`}
                                    >
                                        <div className="flex justify-between gap-4">
                                            {/* Left side */}
                                            <div className="flex flex-col justify-between gap-2">
                                                <p className="text-md text-text font-medium">{event.time}</p>
                                                <h3 className="text-xl font-bold text-text">{event.title}</h3>
                                                <p className="text-text text-sm">{event.description}</p>
                                            </div>

                                            {/* Right side */}
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
                                                    <span className="text-sm">Location</span>
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
                                                            setCurrentEvent(event);
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

            {/* Modals */}
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
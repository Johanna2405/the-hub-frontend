import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import EditEventModal from "./EditEventModal";

const DailyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [events, setEvents] = useState(() => {
        const savedEvents = localStorage.getItem("dailyEvents");
        return savedEvents
            ? JSON.parse(savedEvents)
            : [
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

    // Load events from local storage
    useEffect(() => {
        const saved = localStorage.getItem("dailyEvents");
        if (saved) setEvents(JSON.parse(saved));
    }, []);

    // Save events to local storage
    useEffect(() => {
        localStorage.setItem("dailyEvents", JSON.stringify(events));
    }, [events]);

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

    const handleAddEvent = (newEvent) => {
        if (newEvent.day) {
            setSelectedDay(newEvent.day);
        }
        setEvents([...events, { ...newEvent, id: Date.now() }]);
    };

    const handleEditEvent = (updatedEvent) => {
        setEvents(events.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
    };

    const handleDeleteEvent = (eventId) => {
        setEvents(events.filter((event) => event.id !== eventId));
    };

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

            {/* Day Selector */}
            <div className="flex items-center justify-between mb-8">
                <IconBtn
                    color="primary"
                    icon="fi-rr-angle-small-left"
                    onClick={onPrev}
                />
                <h2 className="text-xl font-semibold text-text">Day</h2>
                <IconBtn
                    color="primary"
                    icon="fi-rr-angle-small-right"
                    onClick={onNext}
                />
            </div>

            {/* Date Strip */}
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

            {/* Events */}
            <div className="flex flex-col gap-4">
                {events
                    .filter((event) => event.day === selectedDay)
                    .map((event) => (
                        <div
                            key={event.id}
                            className="bg-primary rounded-2xl p-7 hover:border-2 hover:border-ultramarine"
                        >
                            <div className="flex items-center justify-between">
                                <p className="text-md text-text font-medium">{event.time}</p>
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
                            <h3 className="text-xl font-bold text-text mt-2">{event.title}</h3>
                            <p className="text-text text-sm mt-1">{event.description}</p>
                        </div>
                    ))}
            </div>

            {/* Modals */}
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
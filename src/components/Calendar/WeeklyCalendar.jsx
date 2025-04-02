import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";

const WeeklyCalendar = ({ onPrev, onNext }) => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("25");
    const [expanded, setExpanded] = useState("25");
    const [showNewEventModal, setShowNewEventModal] = useState(false);
    const [showAddEventModal, setShowAddEventModal] = useState(false);
    const [showEditEventModal, setShowEditEventModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [currentDayForAddEvent, setCurrentDayForAddEvent] = useState(null);

    const days = [
        { day: "22", label: "Sat" },
        { day: "23", label: "Sun" },
        { day: "24", label: "Mon" },
        { day: "25", label: "Tue" },
        { day: "26", label: "Wed" },
        { day: "27", label: "Thu" },
        { day: "28", label: "Fri" },
    ];

    const [weeklyEvents, setWeeklyEvents] = useState(() => {
        const saved = localStorage.getItem("weeklyEvents");
        return saved ? JSON.parse(saved) : {
            24: [{ id: 1, time: "12:00 - 14:00", title: "Event title", description: "", type: "Private" }],
            25: [
                { id: 2, time: "12:00 - 14:00", title: "Event title", description: "", type: "Private" },
                { id: 3, time: "16:00 - 18:00", title: "Event title", description: "", type: "Community" },
            ],
        };
    });

    useEffect(() => {
        localStorage.setItem("weeklyEvents", JSON.stringify(weeklyEvents));
    }, [weeklyEvents]);

    const handleAddEvent = (newEvent) => {
        const day = newEvent.day;
        setSelectedDay(day); // Update the selected day to the new event's day
        setExpanded(day); // Expand the section for the new event's day
        setWeeklyEvents((prev) => ({
            ...prev,
            [day]: prev[day]
                ? [...prev[day], { ...newEvent, id: Date.now() }]
                : [{ ...newEvent, id: Date.now() }],
        }));
    };

    const handleAddAdditionalEvent = (newEvent) => {
        const day = newEvent.day;
        setWeeklyEvents((prev) => ({
            ...prev,
            [day]: prev[day]
                ? [...prev[day], { ...newEvent, id: Date.now() }]
                : [{ ...newEvent, id: Date.now() }],
        }));
    };

    const handleEditEvent = (updatedEvent) => {
        const day = updatedEvent.day;
        setWeeklyEvents((prev) => ({
            ...prev,
            [day]: prev[day].map((event) =>
                event.id === updatedEvent.id ? updatedEvent : event
            ),
        }));
    };

    const handleDeleteEvent = (day, eventId) => {
        setWeeklyEvents((prev) => ({
            ...prev,
            [day]: prev[day].filter((event) => event.id !== eventId),
        }));
    };

    return (
        <div className="p-4 bg-base">
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

            {/* Week Selector */}
            <div className="flex items-center justify-between mb-8">
                <IconBtn
                    color="primary"
                    icon="fi-rr-angle-small-left"
                    onClick={onPrev}
                />
                <h2 className="text-xl font-semibold text-text">Week</h2>
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

            {/* Weekly Events */}
            {weeklyEvents[selectedDay] ? (
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
                        {weeklyEvents[selectedDay].map((event) => (
                            <div
                                key={event.id}
                                className={`rounded-2xl p-4 flex justify-between items-center ${selectedDay === "25" ? "bg-[#F1DAFF]" : "bg-primary"}`}
                            >
                                <div>
                                    {event.time && (
                                        <p className="mb-1 !text-base">{event.time}</p>
                                    )}
                                    <h4 className="text-text text-xl font-light">{event.title}</h4>
                                    {event.description && (
                                        <p className="text-text text-sm mt-1">{event.description}</p>
                                    )}
                                </div>
                                <div className="flex gap-2 items-center">
                                    {event.type && (
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm ${event.type === "Private"
                                                ? "border border-secondary text-secondary"
                                                : "border border-text text-text"
                                                }`}
                                        >
                                            {event.type}
                                        </span>
                                    )}
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
                                            setCurrentEvent({ ...event, day: selectedDay });
                                            setShowEditEventModal(true);
                                        }}
                                    />
                                    <IconBtn
                                        color="error"
                                        icon="fi-rr-trash"
                                        onClick={() => handleDeleteEvent(selectedDay, event.id)}
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
            ) : (<p className="text-text text-center">No events for this day.</p>)}

            {/* Modals */}
            <NewEventModal
                show={showNewEventModal}
                onClose={() => setShowNewEventModal(false)}
                onSave={handleAddEvent}
                onDayChange={(day) => {
                    setSelectedDay(day);
                    setExpanded(day);
                }} // Also expand the section for the new day
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
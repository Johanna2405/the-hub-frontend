import { useNavigate } from "react-router";
import { useState } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";

const WeeklyCalendar = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("25");
    const [expanded, setExpanded] = useState("25");

    const days = [
        { day: "22", label: "Sat" },
        { day: "23", label: "Sun" },
        { day: "24", label: "Mon" },
        { day: "25", label: "Tue" },
        { day: "26", label: "Wed" },
        { day: "27", label: "Thu" },
        { day: "28", label: "Fri" },
    ];

    const weeklyEvents = {
        24: [{ title: "Event title" }],
        25: [
            { time: "12:00 - 14:00", title: "Event title" },
            { time: "16:00 - 18:00", title: "Event title" },
        ],
    };

    return (
        <div className="p-4 bg-base">
            <Header showBackButton={true} onBack={() => navigate(-1)} />

            {/* Title and Add */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <IconBtn color="neon" icon="fi-rr-plus-small" />
            </div>

            {/* Week Selector */}
            <div className="flex items-center justify-between mb-8">
                <IconBtn color="primary" icon="fi-rr-angle-small-left" />
                <h2 className="text-xl font-semibold text-text">Week</h2>
                <IconBtn color="primary" icon="fi-rr-angle-small-right" />
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
            {Object.entries(weeklyEvents).map(([day, events]) => {
                const isToday = day === "25";
                const bg = isToday ? "bg-secondary" : "bg-primary";
                const showEvents = expanded === day;

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
                            <button
                                onClick={() => setExpanded(expanded === day ? null : day)}
                            >
                                <i
                                    className={`fi-rr-angle-small-${expanded === day ? "up" : "down"
                                        } text-text`}
                                ></i>
                            </button>
                        </div>

                        {showEvents && (
                            <div className="flex flex-col gap-4">
                                {events.map((event, i) => (
                                    <div
                                        key={i}
                                        className={`rounded-2xl p-4 flex justify-between items-center ${day === "25" ? "bg-[#F1DAFF]" : "bg-primary"
                                            }`}
                                    >
                                        <div>
                                            {event.time && (
                                                <p className="mb-1 !text-base">{event.time}</p>
                                            )}
                                            <h4 className="text-text text-xl font-light">{event.title}</h4>
                                        </div>
                                        <IconBtn color="base" icon="fi-rr-plus-small" />
                                    </div>
                                ))}
                                {isToday && (
                                    <a className="text-text font-bold mt-2 cursor-pointer">
                                        Go to Day
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default WeeklyCalendar;

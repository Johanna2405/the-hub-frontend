import { useNavigate } from "react-router";
import { useState } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";

const MonthlyCalendar = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("1");

    const days = Array.from({ length: 28 }, (_, i) => {
        const date = new Date(2025, 2, i + 1); // March 2025
        const dayName = date.toLocaleDateString("en-GB", { weekday: "short" });
        return {
            day: (i + 1).toString().padStart(2, '0'),
            label: dayName,
        };
    });

    const events = [
        {
            time: "12:00 - 14:00",
            title: "Event title",
            description: "Description",
            type: "Private",
        },
        {
            time: "16:00 - 18:00",
            title: "Event title",
            description: "Description",
            type: "Community",
        },
    ];

    return (
        <div className="p-4 bg-base min-h-screen w-full md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto">
            {/* Header */}
            <Header showBackButton={true} onBack={() => navigate(-1)} />

            {/* Title and Add */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <IconBtn color="neon" icon="fi-rr-plus-small" />
            </div>

            {/* Month Selector */}
            <div className="flex items-center justify-between mb-4">
                <IconBtn color="primary" icon="fi-rr-angle-small-left" />
                <h2 className="text-xl font-semibold text-text">Month</h2>
                <IconBtn color="primary" icon="fi-rr-angle-small-right" />
            </div>

            {/* Month Label */}
            <div className="text-center text-lilac font-bold text-xl mb-4">March</div>

            {/* Grid Calendar */}
            <div className="grid grid-cols-7 gap-2 mb-8">
                {days.map((day, index) => (
                    <div
                        key={index}
                        onClick={() => setSelectedDay(day.day)}
                        className={`flex flex-col items-center border text-text rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 ${selectedDay === day.day ? "bg-primary text-base" : "text-text"}`}
                    >
                        <span className="font-bold text-lg">{day.day}</span>
                        <span className="text-sm text-text">{day.label}</span>
                    </div>
                ))}
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4">
                {events.map((event, index) => (
                    <div
                        key={index}
                        className="bg-primary rounded-2xl p-6 hover:border-2 hover:border-ultramarine"
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
                                <span className={`rounded-full px-3 py-1 text-sm ${event.type === "Private" ? "border border-secondary text-secondary" : "border border-text text-text"}`}>
                                    {event.type}
                                </span>
                                <div className="flex gap-2 items-center text-text">
                                    <i className="fi-rr-home-location text-md"></i>
                                    <span className="text-sm">Location</span>
                                </div>
                                <IconBtn color="base" icon="fi-rr-plus-small" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MonthlyCalendar;
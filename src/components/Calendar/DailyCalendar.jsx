import { useNavigate } from "react-router";
import { useState } from "react";
import Header from "../Header";

const DailyCalendar = () => {
    const navigate = useNavigate();
    const [selectedDay, setSelectedDay] = useState("25");

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
        { day: "31", label: "Mon" },
    ];

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
            <Header
                showBackButton={true}
                onBack={() => navigate(-1)}
            />

            {/* Title and Add */}
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold text-text">Calendar</h1>
                <button className="btn bg-neon text-black text-xl w-10 h-10 rounded-xl border-none">
                    +
                </button>
            </div>

            {/* Day Selector */}
            <div className="flex items-center justify-between mb-8">
                <button className="btn bg-primary border-none text-lg w-10">&lt;</button>
                <h2 className="text-xl font-semibold text-text">Day</h2>
                <button className="btn bg-primary border-none text-lg w-10">&gt;</button>
            </div>

            {/* Date Strip */}
            <div className="flex gap-2 overflow-x-auto mb-6">
                {days.map(({ day, label }) => (
                    <div
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer hover:bg-primary transition-all duration-200 w-16 min-w-[64px] ${selectedDay === day ? "bg-base" : "bg-white"}`}>

                        <span className="text-text font-bold text-lg">{day}</span>
                        <span className="text-lilac font-semibold text-sm">03</span>
                        <span className="text-sm text-text">{label}</span>
                    </div>
                ))}
            </div>

            {/* Events */}
            <div className="flex flex-col gap-4 ">
                {events.map((event, index) => (
                    <div key={index} className="bg-primary rounded-2xl p-7 hover:border-2 hover:border-ultramarine">
                        <div className="flex items-center justify-between">
                            <p className="text-md text-text font-medium">{event.time}</p>
                            <span className="border border-text text-text rounded-full px-3 py-1 text-sm">
                                {event.type}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-text mt-2">{event.title}</h3>
                        <p className="text-text text-sm mt-1">{event.description}</p>
                        <div className="flex justify-end">
                            <button className="btn bg-base text-black text-xl w-10 h-10 rounded-xl border-none">
                                +
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DailyCalendar;
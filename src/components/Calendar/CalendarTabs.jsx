import { useState } from "react";
import DailyCalendar from "./DailyCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
import MonthlyCalendar from "./MonthlyCalendar";

const CalendarTabs = () => {
    const [view, setView] = useState("day");

    const tabStyle = (type) =>
        `px-4 py-2 rounded-full text-md font-semibold transition-all duration-200 
    ${view === type
            ? "bg-primary text-text"
            : "bg-white text-text hover:bg-primary"
        }`;

    return (
        <div className="p-4 bg-base">

            {/* Tab Navigation */}
            <div className="flex justify-center gap-4 mb-8">
                <button onClick={() => setView("day")} className={tabStyle("day")}>
                    Day
                </button>
                <button onClick={() => setView("week")} className={tabStyle("week")}>
                    Week
                </button>
                <button onClick={() => setView("month")} className={tabStyle("month")}>
                    Month
                </button>
            </div>

            {/* Dynamic TAB Calendar Content */}
            {view === "day" && <DailyCalendar />}
            {view === "week" && <WeeklyCalendar />}
            {view === "month" && <MonthlyCalendar />}
        </div>
    );
};

export default CalendarTabs;
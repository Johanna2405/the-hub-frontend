import { useState } from "react";
import { useNavigate } from "react-router";
import DailyCalendar from "./DailyCalendar";
import WeeklyCalendar from "./WeeklyCalendar";
import MonthlyCalendar from "./MonthlyCalendar";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";

const CalendarTabs = () => {
  const [view, setView] = useState("day");
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const navigate = useNavigate();

  const tabStyle = (type) =>
    `px-4 py-2 rounded-full text-md font-semibold transition-all duration-200 
    ${
      view === type
        ? "bg-primary text-text"
        : "bg-white text-text hover:bg-primary"
    }`;

  const goToPrevView = () => {
    const order = ["day", "week", "month"];
    const index = order.indexOf(view);
    setView(order[(index - 1 + order.length) % order.length]);
  };

  const goToNextView = () => {
    const order = ["day", "week", "month"];
    const index = order.indexOf(view);
    setView(order[(index + 1) % order.length]);
  };

  return (
    <div className="bg-base">
      <Header showBackButton={true} onBack={() => navigate(-1)} />
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold text-text">Calendar</h1>
        <IconBtn
          color="neon"
          icon="fi-rr-plus-small"
          onClick={() => setShowNewEventModal(true)}
        />
      </div>
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

      {/* Inject Navigation Button Handlers */}
      {view === "day" && (
        <DailyCalendar onPrev={goToPrevView} onNext={goToNextView} />
      )}
      {view === "week" && (
        <WeeklyCalendar onPrev={goToPrevView} onNext={goToNextView} />
      )}
      {view === "month" && (
        <MonthlyCalendar onPrev={goToPrevView} onNext={goToNextView} />
      )}

      <NewEventModal
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        selectedDay={new Date().getDate().toString().padStart(2, "0")}
        selectedMonth={(new Date().getMonth() + 1).toString().padStart(2, "0")}
        selectedYear={new Date().getFullYear().toString()}
      />
    </div>
  );
};

export default CalendarTabs;

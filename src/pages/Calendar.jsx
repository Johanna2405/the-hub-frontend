import { useState } from "react";
import { useNavigate } from "react-router";
import DailyCalendar from "../components/Calendar/DailyCalendar";
import WeeklyCalendar from "../components/Calendar/WeeklyCalendar";
import MonthlyCalendar from "../components/Calendar/MonthlyCalendar";
import Header from "../components/Header";
import IconBtn from "../components/IconBtn";
import NewEventModal from "../components/Calendar/NewEventModal";

const CalendarTabs = () => {
  const [view, setView] = useState("day");
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const navigate = useNavigate();
  const [refreshEvents, setRefreshEvents] = useState(false);

  const tabStyle = (type) =>
    `px-4 py-2 rounded-full text-md font-semibold transition-all duration-200 
    ${
      view === type
        ? "bg-lilac text-base"
        : "bg-base border-2 border-lilac text-text hover:bg-lilac"
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
    <div>
      <Header
        title={"Calendar"}
        showBackButton={true}
        onBack={() => navigate(-1)}
        RightAction={
          <IconBtn
            onClick={() => setShowNewEventModal(true)}
            color={"neon"}
            icon={"fi-rr-plus-small"}
          />
        }
      />
      {/* Tab Navigation */}
      <div className="flex justify-center gap-2 mb-8">
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
        <DailyCalendar
          onPrev={goToPrevView}
          onNext={goToNextView}
          refreshTrigger={refreshEvents}
        />
      )}
      {view === "week" && (
        <WeeklyCalendar
          onPrev={goToPrevView}
          onNext={goToNextView}
          refreshTrigger={refreshEvents}
        />
      )}
      {view === "month" && (
        <MonthlyCalendar
          onPrev={goToPrevView}
          onNext={goToNextView}
          refreshTrigger={refreshEvents}
        />
      )}

      <NewEventModal
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        selectedDay={new Date().getDate().toString().padStart(2, "0")}
        selectedMonth={(new Date().getMonth() + 1).toString().padStart(2, "0")}
        selectedYear={new Date().getFullYear().toString()}
        onEventCreated={() => setRefreshEvents((prev) => !prev)}
      />
    </div>
  );
};

export default CalendarTabs;

import { useState, useEffect } from "react";
import IconBtn from "../IconBtn";
import EventList from "./EventList";
import { fetchEvents } from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";
import { useCommunity } from "../../context/CommunityContext";
import { fetchCommunityEvents } from "../../utils/community";

const MonthlyCalendar = ({ refreshTrigger }) => {
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [detailView, setDetailView] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();
  const isCommunityView = Boolean(currentCommunity?.id);

  useEffect(() => {
    const user_id = user?.id;
    if (!user_id) return;

    const loadEvents = async () => {
      try {
        let events = [];

        if (isCommunityView) {
          events = await fetchCommunityEvents(currentCommunity?.id);
        } else {
          events = await fetchEvents();
        }

        const formattedEvents = events.map((event) => ({
          ...event,
        }));

        setEvents(formattedEvents);
        // localStorage.setItem("monthly_events", JSON.stringify(formattedEvents));
      } catch (err) {
        console.log("Error loading events:", err);
        const cached = localStorage.getItem("monthly_events");
        if (cached) setEvents(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [user, isCommunityView, currentCommunity, refreshTrigger]);

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(selectedYear, selectedMonth, i + 1);
    return {
      fullDate: date,
      day: (i + 1).toString().padStart(2, "0"),
      label: date.toLocaleDateString("en-GB", { weekday: "short" }),
    };
  });

  const goToPrevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedDate(prev);
    setDetailView(null);
  };

  const goToNextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedDate(next);
    setDetailView(null);
  };

  const handleDayClick = (date) => {
    if (
      detailView &&
      detailView.getDate() === date.getDate() &&
      detailView.getMonth() === date.getMonth() &&
      detailView.getFullYear() === date.getFullYear()
    ) {
      setDetailView(null);
    } else {
      setDetailView(date);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex items-center justify-between mb-6 w-full lg:max-w-2xl">
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-left"
          onClick={goToPrevMonth}
        />
        <h2 className="text-text">
          {selectedDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </h2>
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-right"
          onClick={goToNextMonth}
        />
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-2 mb-6 w-full  lg:max-w-2xl">
        {days.map(({ day, label, fullDate }) => {
          const isSelected =
            (detailView &&
              detailView.getDate() === fullDate.getDate() &&
              detailView.getMonth() === fullDate.getMonth() &&
              detailView.getFullYear() === fullDate.getFullYear()) ||
            (!detailView &&
              selectedDate.getDate() === fullDate.getDate() &&
              selectedDate.getMonth() === fullDate.getMonth() &&
              selectedDate.getFullYear() === fullDate.getFullYear());

          return (
            <div
              key={day}
              onClick={() => handleDayClick(fullDate)}
              className={`flex flex-col items-center border rounded-xl px-2 py-2 cursor-pointer transition-all duration-200 ${
                isSelected ? "bg-primary text-lilac" : "bg-base"
              }`}
            >
              <span className="text-text font-bold text-lg">{day}</span>
              <span className="text-sm text-text">{label}</span>
            </div>
          );
        })}
      </div>

      {detailView && (
        <div className="mb-4 text-center">
          <button
            className="text-lg font-semibold cursor-pointer text-lilac"
            onClick={() => setDetailView(null)}
          >
            Show full month
          </button>
        </div>
      )}

      <EventList
        loading={loading}
        events={events}
        setEvents={setEvents}
        selectedDate={detailView || selectedDate}
        detailView={detailView}
        weekDays={[]}
        view={detailView ? "day" : "month"}
      />
    </div>
  );
};

export default MonthlyCalendar;

import { useState, useEffect } from "react";
import IconBtn from "../IconBtn";
import EventList from "./EventList";
import { fetchEvents, deleteEvent } from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";
import { useCommunity } from "../../context/CommunityContext";
import { fetchCommunityEvents } from "../../utils/community";

const WeeklyCalendar = () => {
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [detailView, setDetailView] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
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
        localStorage.setItem("weekly_events", JSON.stringify(formattedEvents));
      } catch (err) {
        console.log("Error loading events:", err);
        const fallback = localStorage.getItem("weekly_events");
        if (fallback) setEvents(JSON.parse(fallback));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [user, isCommunityView, currentCommunity]);

  const getWeekDays = (baseDate) => {
    const week = [];
    const dayIndex = baseDate.getDay();
    const monday = new Date(baseDate);
    monday.setDate(baseDate.getDate() - ((dayIndex + 6) % 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      week.push({
        fullDate: date,
        day: date.getDate().toString().padStart(2, "0"),
        month: (date.getMonth() + 1).toString().padStart(2, "0"),
        year: date.getFullYear().toString(),
        label: date.toLocaleDateString("en-GB", { weekday: "short" }),
      });
    }

    return week;
  };

  const weekDays = getWeekDays(selectedDate);

  const goToPrevWeek = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 7);
    setSelectedDate(prev);
    setDetailView(null); // ← reset detailView
  };

  const goToNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    setSelectedDate(next);
    setDetailView(null); // ← reset detailView
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
    <div className="p-4 bg-base">
      <div className="flex items-center justify-between mb-8">
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-left"
          onClick={goToPrevWeek}
        />
        <h2 className="text-xl font-semibold text-text">Week</h2>
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-right"
          onClick={goToNextWeek}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap gap-2 mb-6">
          {weekDays.map(({ day, label, month, year, fullDate }) => {
            const isSelected =
              detailView &&
              detailView.getDate() === fullDate.getDate() &&
              detailView.getMonth() === fullDate.getMonth() &&
              detailView.getFullYear() === fullDate.getFullYear();

            return (
              <div
                key={`${day}-${month}-${year}`}
                onClick={() => handleDayClick(fullDate)}
                className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 w-16 ${
                  isSelected ? "bg-primary text-base" : "bg-base"
                }`}
              >
                <span className="text-text font-bold text-lg">{day}</span>
                <span className="text-lilac font-semibold text-sm">
                  {month}
                </span>
                <span className="text-sm text-text">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {detailView && (
        <div className="mb-4 text-center">
          <button
            className="text-sm text-lilac underline"
            onClick={() => setDetailView(null)}
          >
            Show full week
          </button>
        </div>
      )}

      <EventList
        loading={loading}
        events={events}
        setEvents={setEvents}
        selectedDate={detailView || selectedDate}
        detailView={detailView}
        weekDays={weekDays}
        view={detailView ? "day" : "week"}
      />
    </div>
  );
};

export default WeeklyCalendar;

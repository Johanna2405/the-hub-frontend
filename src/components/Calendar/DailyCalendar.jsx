import { useState, useEffect } from "react";
import IconBtn from "../IconBtn";
import EventList from "./EventList";
import { fetchEvents } from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";
import { useCommunity } from "../../context/CommunityContext";
import { fetchCommunityEvents } from "../../utils/community";

const DailyCalendar = ({ onPrev, onNext }) => {
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(
    today.getDate().toString().padStart(2, "0")
  );
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const isCommunityView = Boolean(currentCommunity?.id);

  console.log("isCommunityView??", isCommunityView);
  const getWeekDays = (currentDate) => {
    const week = [];
    const dayIndex = currentDate.getDay();
    const monday = new Date(currentDate);
    monday.setDate(currentDate.getDate() - ((dayIndex + 6) % 7));

    for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const label = date.toLocaleDateString("en-GB", { weekday: "short" });

      week.push({
        fullDate: date,
        day,
        month,
        year: date.getFullYear().toString(),
        label,
      });
    }

    return week;
  };

  const currentDate = new Date(
    selectedYear,
    selectedMonth,
    parseInt(selectedDay)
  );
  const weekDays = getWeekDays(currentDate);

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
        // localStorage.setItem("daily_events", JSON.stringify(formattedEvents));
      } catch (err) {
        const fallback = localStorage.getItem("daily_events");
        if (fallback) setEvents(JSON.parse(fallback));
        console.log("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, [user, isCommunityView, currentCommunity]);

  useEffect(() => {
    const today = new Date();
    setSelectedDay(today.getDate().toString().padStart(2, "0"));
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  }, []);

  const goToPrevDay = () => {
    const currentDate = new Date(
      selectedYear,
      selectedMonth,
      parseInt(selectedDay)
    );
    currentDate.setDate(currentDate.getDate() - 1);

    setSelectedDay(currentDate.getDate().toString().padStart(2, "0"));
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
  };

  const goToNextDay = () => {
    const currentDate = new Date(
      selectedYear,
      selectedMonth,
      parseInt(selectedDay)
    );
    currentDate.setDate(currentDate.getDate() + 1);

    setSelectedDay(currentDate.getDate().toString().padStart(2, "0"));
    setSelectedMonth(currentDate.getMonth());
    setSelectedYear(currentDate.getFullYear());
  };

  const selectedDate = new Date(
    selectedYear,
    selectedMonth,
    parseInt(selectedDay)
  );

  return (
    <div className="p-4 bg-base">
      <div className="flex items-center justify-between mb-8">
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-left"
          onClick={goToPrevDay}
        />
        <h2 className="text-xl font-semibold text-text">Day</h2>
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-right"
          onClick={goToNextDay}
        />
      </div>

      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap gap-2 mb-6">
          {weekDays.map(({ day, label, month, year }) => (
            <div
              key={`${day}-${month}-${year}`}
              onClick={() => {
                setSelectedDay(day);
                setSelectedMonth(parseInt(month) - 1);
                setSelectedYear(parseInt(year));
              }}
              className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 w-16 ${
                selectedDay === day &&
                selectedMonth === parseInt(month) - 1 &&
                selectedYear.toString() === year
                  ? "bg-primary text-base"
                  : "bg-base"
              }`}
            >
              <span className="text-text font-bold text-lg">{day}</span>
              <span className="text-lilac font-semibold text-sm">{month}</span>
              <span className="text-sm text-text">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <EventList
        loading={loading}
        events={events}
        setEvents={setEvents}
        selectedDate={selectedDate}
        view="day"
      />
    </div>
  );
};

export default DailyCalendar;

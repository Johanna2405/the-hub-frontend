import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import EditEventModal from "./EditEventModal";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";

const DailyCalendar = ({ onPrev, onNext }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const today = new Date();
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth());
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState(
    today.getDate().toString().padStart(2, "0")
  );
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

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
    const loadEvents = async () => {
      try {
        const allEvents = await fetchEvents();
        setEvents(allEvents);
        localStorage.setItem("daily_events", JSON.stringify(allEvents));
      } catch (err) {
        const fallback = localStorage.getItem("daily_events");
        if (fallback) setEvents(JSON.parse(fallback));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  useEffect(() => {
    const today = new Date();
    setSelectedDay(today.getDate().toString().padStart(2, "0"));
    setSelectedMonth(today.getMonth());
    setSelectedYear(today.getFullYear());
  }, []);

  const handleAddEvent = async (newEvent) => {
    try {
      const [start, end] = newEvent.time.split("-").map((t) => t.trim());
      const dateString = `${selectedYear}-${(selectedMonth + 1)
        .toString()
        .padStart(2, "0")}-${newEvent.day}`;
      const startTime = `${dateString}T${start}:00`;
      const endTime = `${dateString}T${end}:00`;

      const payload = {
        user_id: user?.id || null,
        title: newEvent.title,
        description: newEvent.description,
        type: newEvent.type,
        date: dateString,
        start_time: startTime,
        end_time: endTime,
        location: newEvent.location || "Not specified",
      };

      const saved = await createEvent(payload);
      const updated = [...events, saved];
      setEvents(updated);
      localStorage.setItem("daily_events", JSON.stringify(updated));
      setSelectedDay(newEvent.day);
    } catch (err) {
      alert(err.message || "Failed to add event");
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const payload = {
        user_id: user?.id || null,
        title: updatedEvent.title,
        description: updatedEvent.description,
        type: updatedEvent.type,
        date: updatedEvent.date,
        start_time: updatedEvent.start_time,
        end_time: updatedEvent.end_time,
        location: updatedEvent.location || "Not specified",
      };

      const result = await updateEvent(updatedEvent.id, payload);
      const updated = events.map((e) =>
        e.id === updatedEvent.id ? result : e
      );
      setEvents(updated);
      localStorage.setItem("daily_events", JSON.stringify(updated));
    } catch (err) {
      alert(err.message || "Failed to update event");
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await deleteEvent(eventId);
      const filtered = events.filter((e) => e.id !== eventId);
      setEvents(filtered);
      localStorage.setItem("daily_events", JSON.stringify(filtered));
    } catch (err) {
      alert("Failed to delete event");
    }
  };

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

      {loading ? (
        <div className="flex flex-col gap-4 items-center py-8 w-full">
          <span className="loading loading-spinner loading-lg text-lilac mb-6"></span>
          <div className="w-full max-w-xl space-y-4 animate-pulse">
            <div className="h-6 bg-base rounded w-1/3"></div>
            <div className="h-4 bg-base rounded w-2/3"></div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {events
            .filter((event) => event.date?.endsWith(selectedDay))
            .map((event) => (
              <div
                key={event.id}
                className="bg-primary rounded-2xl p-7 hover:border-2 hover:border-ultramarine"
              >
                <div className="flex items-center justify-between">
                  <p className="text-md text-text font-medium">
                    {new Date(event.start_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}{" "}
                    -{" "}
                    {new Date(event.end_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                  <div className="flex items-center gap-2">
                    <span
                      className={`rounded-full px-3 py-1 text-sm ${
                        event.type === "Private"
                          ? "border border-secondary text-secondary"
                          : "border border-text text-text"
                      }`}
                    >
                      {event.type}
                    </span>
                    <IconBtn
                      color="base"
                      icon="fi-rr-pencil"
                      onClick={() => {
                        setCurrentEvent({
                          ...event,
                          time: `${new Date(
                            event.start_time
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })} - ${new Date(event.end_time).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}`,
                          day: event.date.split("-")[2],
                        });
                        setShowEditEventModal(true);
                      }}
                    />
                    <IconBtn
                      color="error"
                      icon="fi-rr-trash"
                      onClick={() => handleDeleteEvent(event.id)}
                    />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-text mt-2">
                  {event.title}
                </h3>
                <p className="text-text text-sm mt-1">{event.description}</p>
                <div className="flex gap-2 items-center text-text mt-1">
                  <i className="fi-rr-home-location text-md"></i>
                  <span className="text-sm">
                    {event.location || "Not specified"}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
      <NewEventModal
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        onSave={handleAddEvent}
        onDayChange={setSelectedDay}
        selectedDay={selectedDay}
        selectedMonth={currentMonth}
        selectedYear={currentYear}
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

export default DailyCalendar;

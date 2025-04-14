import { useNavigate } from "react-router";
import { useState, useEffect } from "react";
import Header from "../Header";
import IconBtn from "../IconBtn";
import NewEventModal from "./NewEventModal";
import AddEventModal from "./AddEventModal";
import EditEventModal from "./EditEventModal";
import {
  fetchEvents,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../../utils/calendarAPI";
import { useUser } from "../../context/UserContext";

const WeeklyCalendar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [currentDayForAddEvent, setCurrentDayForAddEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load events
  useEffect(() => {
    const loadEvents = async () => {
      try {
        const all = await fetchEvents();
        setEvents(all);
        localStorage.setItem("weekly_events", JSON.stringify(all));
      } catch (err) {
        const fallback = localStorage.getItem("weekly_events");
        if (fallback) setEvents(JSON.parse(fallback));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

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
  };

  const goToNextWeek = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 7);
    setSelectedDate(next);
  };

  const handleAddEvent = async (newEvent) => {
    try {
      const [start, end] = newEvent.time.split("-").map((t) => t.trim());
      const dateString = `${newEvent.year}-${newEvent.month}-${newEvent.day}`;
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
      setEvents((prev) => [...prev, saved]);
    } catch (err) {
      alert(err.message || "Failed to add event");
    }
  };

  const handleEditEvent = async (updatedEvent) => {
    try {
      const result = await updateEvent(updatedEvent.id, updatedEvent);
      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? result : e))
      );
    } catch (err) {
      alert("Failed to update event");
    }
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      alert("Failed to delete event");
    }
  };

  const filteredEvents = events.filter((event) =>
    weekDays.some((day) => {
      const [yr, mo, dy] = event.date.split("-");
      return dy === day.day && mo === day.month && yr === day.year;
    })
  );

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

      {/* Days of the week */}
      <div className="w-full flex items-center justify-center">
        <div className="flex flex-wrap gap-2 mb-6">
          {weekDays.map(({ day, label, month, year, fullDate }) => {
            const isSelected =
              selectedDate.getDate() === fullDate.getDate() &&
              selectedDate.getMonth() === fullDate.getMonth() &&
              selectedDate.getFullYear() === fullDate.getFullYear();

            return (
              <div
                key={`${day}-${month}-${year}`}
                onClick={() => setSelectedDate(fullDate)}
                className={`flex flex-col items-center border rounded-xl px-4 py-2 cursor-pointer transition-all duration-200 w-16 ${
                  isSelected ? "bg-base" : "bg-base"
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

      {/* Week event title + new event button */}
      <div className="flex justify-between mb-4">
        <h3 className="text-text font-semibold">
          Events from {weekDays[0].day}.{weekDays[0].month} to {weekDays[6].day}
          .{weekDays[6].month}
        </h3>
        <IconBtn
          color="neon"
          icon="fi-rr-plus-small"
          onClick={() => setShowNewEventModal(true)}
        />
      </div>

      {/* Events list */}
      {loading ? (
        <p className="text-text text-center">Loading...</p>
      ) : filteredEvents.length ? (
        <div className="flex flex-col gap-4">
          {filteredEvents.map((event) => (
            <div key={event.id} className="bg-primary rounded-2xl p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-text">{event.title}</h4>
                <div className="flex gap-2">
                  <IconBtn
                    color="base"
                    icon="fi-rr-pencil"
                    onClick={() => {
                      setCurrentEvent(event);
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
              <p className="text-text text-sm">{event.description}</p>
              <p className="text-text text-sm mt-1">
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
            </div>
          ))}
        </div>
      ) : (
        <p className="text-text text-center">No events for this week.</p>
      )}

      {/* Modals */}
      <NewEventModal
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        onSave={handleAddEvent}
        onDayChange={(day) => {
          setSelectedDate(new Date(selectedDate.setDate(day)));
        }}
        selectedDay={selectedDate.getDate().toString().padStart(2, "0")}
        selectedMonth={(selectedDate.getMonth() + 1)
          .toString()
          .padStart(2, "0")}
        selectedYear={selectedDate.getFullYear().toString()}
      />

      <AddEventModal
        show={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onSave={handleAddEvent} // You can remove handleAddAdditionalEvent completely
        selectedDay={currentDayForAddEvent}
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

export default WeeklyCalendar;

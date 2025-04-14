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

const MonthlyCalendar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState(today);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNewEventModal, setShowNewEventModal] = useState(false);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [showEditEventModal, setShowEditEventModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  const selectedDay = selectedDate.getDate().toString().padStart(2, "0");
  const selectedMonth = selectedDate.getMonth();
  const selectedYear = selectedDate.getFullYear();

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const allEvents = await fetchEvents();
        setEvents(allEvents);
        localStorage.setItem("monthly_events", JSON.stringify(allEvents));
      } catch (err) {
        const cached = localStorage.getItem("monthly_events");
        if (cached) setEvents(JSON.parse(cached));
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
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

  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
  const days = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(selectedYear, selectedMonth, i + 1);
    return {
      fullDate: date,
      day: (i + 1).toString().padStart(2, "0"),
      label: date.toLocaleDateString("en-GB", { weekday: "short" }),
    };
  });

  const groupedEvents = events.reduce((acc, event) => {
    const [y, m, d] = event.date.split("-");
    if (parseInt(m) - 1 !== selectedMonth || parseInt(y) !== selectedYear)
      return acc;
    if (!acc[d]) acc[d] = [];
    acc[d].push(event);
    return acc;
  }, {});

  const goToPrevMonth = () => {
    const prev = new Date(selectedDate);
    prev.setMonth(prev.getMonth() - 1);
    setSelectedDate(prev);
  };

  const goToNextMonth = () => {
    const next = new Date(selectedDate);
    next.setMonth(next.getMonth() + 1);
    setSelectedDate(next);
  };

  return (
    <div className="p-4 bg-base">
      <div className="flex items-center justify-between mb-4">
        <IconBtn
          color="primary"
          icon="fi-rr-angle-small-left"
          onClick={goToPrevMonth}
        />
        <h2 className="text-xl font-semibold text-text">
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
      <div className="grid grid-cols-7 gap-2 mb-6">
        {days.map(({ day, label, fullDate }) => {
          const isSelected =
            selectedDate.getDate() === fullDate.getDate() &&
            selectedDate.getMonth() === fullDate.getMonth() &&
            selectedDate.getFullYear() === fullDate.getFullYear();

          return (
            <div
              key={day}
              onClick={() => setSelectedDate(fullDate)}
              className={`flex flex-col items-center border rounded-xl px-2 py-2 cursor-pointer transition-all duration-200 ${
                isSelected ? "bg-primary text-base" : "bg-base"
              }`}
            >
              <span className="text-text font-bold text-lg">{day}</span>
              <span className="text-sm text-text">{label}</span>
            </div>
          );
        })}
      </div>

      {/* Events for selected day */}
      <div className="flex justify-between mb-4">
        <h3 className="text-text font-semibold">
          Events on {selectedDay}.
          {(selectedMonth + 1).toString().padStart(2, "0")}
        </h3>
        <IconBtn
          color="neon"
          icon="fi-rr-plus-small"
          onClick={() => setShowNewEventModal(true)}
        />
      </div>

      {loading ? (
        <p className="text-text text-center">Loading...</p>
      ) : groupedEvents[selectedDay] ? (
        <div className="flex flex-col gap-4">
          {groupedEvents[selectedDay].map((event) => (
            <div key={event.id} className="bg-primary rounded-2xl p-6">
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-xl font-bold text-text">{event.title}</h4>
                <div className="flex gap-2">
                  <IconBtn
                    color="base"
                    icon="fi-rr-pencil"
                    onClick={() => {
                      setCurrentEvent({
                        ...event,
                        time: `${new Date(event.start_time).toLocaleTimeString(
                          [],
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )} - ${new Date(event.end_time).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}`,
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
        <p className="text-text text-center">No events for this day.</p>
      )}

      {/* Modals */}
      <NewEventModal
        show={showNewEventModal}
        onClose={() => setShowNewEventModal(false)}
        onSave={handleAddEvent}
        onDayChange={(day) =>
          setSelectedDate(new Date(selectedYear, selectedMonth, parseInt(day)))
        }
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
      />

      <AddEventModal
        show={showAddEventModal}
        onClose={() => setShowAddEventModal(false)}
        onSave={handleAddEvent}
        selectedDay={selectedDay}
        selectedMonth={selectedMonth}
        selectedYear={selectedYear}
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

export default MonthlyCalendar;

import { useState } from "react";
import { updateEvent, deleteEvent } from "../../utils/calendarAPI";
import IconBtn from "../IconBtn";
import EditEventModal from "./EditEventModal";
import { showToast } from "../../utils/toast";

const EventList = ({
  loading,
  events,
  setEvents,
  selectedDate,
  detailView,
  view, // "day" | "week" | "month"
  weekDays = [],
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);

  if (loading) {
    return <p className="text-text text-center">Loading...</p>;
  }

  const selectedDay = selectedDate.getDate().toString().padStart(2, "0");
  const selectedMonth = (selectedDate.getMonth() + 1)
    .toString()
    .padStart(2, "0");
  const selectedYear = selectedDate.getFullYear().toString();

  // Filter
  const filteredEvents = events.filter((event) => {
    const [year, month, day] = event.date.split("-");

    if (view === "day") {
      return (
        year === selectedYear && month === selectedMonth && day === selectedDay
      );
    }

    if (view === "week") {
      if (detailView) {
        const dDay = detailView.getDate().toString().padStart(2, "0");
        const dMonth = (detailView.getMonth() + 1).toString().padStart(2, "0");
        const dYear = detailView.getFullYear().toString();
        return year === dYear && month === dMonth && day === dDay;
      }

      const eventDate = new Date(event.date);
      const startOfWeek = new Date(weekDays[0].fullDate);
      const endOfWeek = new Date(weekDays[6].fullDate);
      return eventDate >= startOfWeek && eventDate <= endOfWeek;
    }

    if (view === "month") {
      return year === selectedYear && month === selectedMonth;
    }

    return false;
  });

  const renderHeading = () => {
    if (view === "day") {
      return `Events on ${selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
      })}`;
    }

    if (view === "week" && weekDays.length === 7) {
      const start = `${weekDays[0].day}.${weekDays[0].month}`;
      const end = `${weekDays[6].day}.${weekDays[6].month}`;
      return `Events from ${start} to ${end}`;
    }

    if (view === "month") {
      return `Events in ${selectedDate.toLocaleDateString("en-GB", {
        month: "long",
        year: "numeric",
      })}`;
    }

    return "Events";
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);
      showToast(`Event deleted!`, "success");
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.log(err);
      showToast("Failed to delete an event", "error");
    }
  };

  const handleEditSave = async (updatedEvent) => {
    try {
      const result = await updateEvent(updatedEvent.id, updatedEvent);

      showToast(`Event updated!`, "success");

      setEvents((prev) =>
        prev.map((e) => (e.id === updatedEvent.id ? result : e))
      );
      setShowEditModal(false);
    } catch (err) {
      console.log(err);
      showToast("Failed to update an event", "error");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="text-text font-semibold mb-4">{renderHeading()}</h3>

      {filteredEvents.length ? (
        filteredEvents.map((event) => (
          <div key={event.id} className="bg-primary rounded-2xl p-6">
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xl font-bold text-text">{event.title}</h4>
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
                    setShowEditModal(true);
                  }}
                />
                <IconBtn
                  color="error"
                  icon="fi-rr-trash"
                  onClick={() => handleDelete(event.id)}
                />
              </div>
            </div>
            <p className="text-text text-sm">{event.description}</p>
            <p className="text-text text-sm">{event.date}</p>
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
            <p className="flex gap-2 items-center text-text mt-1">
              <i className="fi-rr-home-location text-md"></i>
              <span className="text-sm">
                {event.location || "Not specified"}
              </span>
            </p>
          </div>
        ))
      ) : (
        <p className="text-text text-center">No events for this {view}.</p>
      )}

      {/* Edit Modal */}
      <EditEventModal
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        event={currentEvent}
      />
    </div>
  );
};

export default EventList;

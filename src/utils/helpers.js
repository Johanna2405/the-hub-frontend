export const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const diff = Math.floor((Date.now() - date.getTime()) / 1000);

  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

export const getDaysInMonth = (year, month) => {
  return new Date(year, month, 0).getDate();
};

export const formatTime = (date) =>
  date.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const h = hour.toString().padStart(2, "0");
      const m = minute.toString().padStart(2, "0");
      options.push(`${h}:${m}`);
    }
  }
  return options;
};

export const timeOptions = Array.from({ length: 24 }, (_, hour) => {
  const h = hour.toString().padStart(2, "0");
  return [`${h}:00`, `${h}:30`];
}).flat();

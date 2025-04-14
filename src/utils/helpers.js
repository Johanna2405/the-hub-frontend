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

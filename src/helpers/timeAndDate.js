export function compareDates(a, b) {
  const dateA = new Date(a);
  const dateB = new Date(b);

  return dateB - dateA;
}

export function toTunisTime(input) {
  const date = new Date(input).toLocaleString("fr-FR", {
    timeZone: "Africa/Tunis",
  });

  return date;
}

export const formatDateTimeLocal = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getStartOfday = (date) => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfday = (date) => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const subtract30Days = (date) => {
  const today = new Date(date);
  today.setDate(today.getDate() - 30);
  return today;
};

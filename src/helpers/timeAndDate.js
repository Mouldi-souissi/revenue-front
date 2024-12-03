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

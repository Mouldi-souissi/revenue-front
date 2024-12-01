export const formatDate = (input) => {
  if (!input) return "-";
  const date = new Date(input);

  // Format date to Tunisian time (Africa/Tunis)
  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Tunis",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return formatter.format(date);
};

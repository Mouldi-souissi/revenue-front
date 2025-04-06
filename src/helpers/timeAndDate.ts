export function compareDates(
  a: string | Date | undefined,
  b: string | Date | undefined,
): number {
  if (!a || !b) return 0;
  const dateA = new Date(a);
  const dateB = new Date(b);
  return dateB.getTime() - dateA.getTime();
}

export function toTunisTime(input: string | undefined): string {
  if (!input) return "";
  return new Date(input).toLocaleString("fr-FR", {
    timeZone: "Africa/Tunis",
  });
}

export const formatDateTimeLocal = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};

export const getStartOfDay = (date: string | Date): Date => {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  return start;
};

export const getEndOfDay = (date: string | Date): Date => {
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);
  return end;
};

export const subtract30Days = (date: string | Date): Date => {
  const result = new Date(date);
  result.setDate(result.getDate() - 30);
  return result;
};

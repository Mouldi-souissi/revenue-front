export const formatInput = (value: string | number): number | string => {
  const numValue = Number(value);
  return numValue > 0 ? numValue : "";
};

export const formatFloat = (value: string): string => {
  return /^\d*\.?\d*$/.test(value) ? value : "";
};

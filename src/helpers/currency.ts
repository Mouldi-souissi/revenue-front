export const formatNumber = (
  input: number | string,
  minimumFractionDigits: number = 0,
): string => {
  return Number(input).toLocaleString("fr", {
    minimumFractionDigits,
  });
};

export const formatCurrency = (
  amount: number,
  currency: string = "TND",
  minimumFractionDigits: number = 0,
): string => {
  return Number(amount).toLocaleString("fr", {
    style: "currency",
    currency,
    minimumFractionDigits,
  });
};

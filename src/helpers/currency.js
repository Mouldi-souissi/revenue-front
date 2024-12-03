export const formatNumber = (input, minimumFractionDigits = 0) => {
  return Number(input).toLocaleString("fr", {
    minimumFractionDigits,
  });
};

export const formatCurrency = (
  amount,
  currency = "TND",
  minimumFractionDigits = 0,
) => {
  return Number(amount).toLocaleString("fr", {
    style: "currency",
    currency: "TND",
    minimumFractionDigits: 0,
  });
};

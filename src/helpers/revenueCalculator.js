export const revenueCalculator = (
  soldBet0,
  soldMax0,
  soldEli0,
  soldForzza0,
  soldBet,
  soldMax,
  soldEli,
  soldForzza,
  gain,
  depenses,
  caisse,
  rate
) => {
  return (
    (soldBet0 +
      soldMax0 +
      soldEli0 +
      soldForzza0 -
      soldMax -
      soldBet -
      soldEli -
      soldForzza +
      gain) *
      rate +
    (caisse - gain - depenses)
  );
};

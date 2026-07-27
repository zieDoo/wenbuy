import type { ETF } from "../types/etf";
import type { BuySignal } from "../types/signal";

export const getBuySignal = (etf: ETF): BuySignal => {
  const currentPercentage = etf.price / etf.high52;
  const dropPercentage = (1 - currentPercentage) * 100;

  const reason =
    dropPercentage >= 0
      ? `${dropPercentage.toFixed(2)}% below ATH`
      : `${Math.abs(dropPercentage).toFixed(2)}% above ATH`;

  if (dropPercentage >= 20) {
    return {
      signal: "BUY",
      reason: reason,
      dropPercentage: Number(dropPercentage.toFixed(2)),
    };
  }
  return {
    signal: "DON'T BUY",
    reason: reason,
    dropPercentage: Number(dropPercentage.toFixed(2)),
  };
};

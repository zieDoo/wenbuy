export type BuySignal = {
  signal: "BUY" | "DON'T BUY";
  reason: string;
  dropPercentage: number;
};

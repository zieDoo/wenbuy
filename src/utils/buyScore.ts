import type { ETF } from "../types/etf";

export function calculateBuyScore(etf: ETF): number {
  const dropFromHigh = ((etf.high52 - etf.price) / etf.high52) * 100;

  const score = dropFromHigh * 2;

  return Math.min(Math.max(score, 0), 100);
}

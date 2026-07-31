import type { ETF } from "../types/etf";
import { calculateBuyScore } from "./buyScore";

export function calculatePortfolioScore(etfs: ETF[]): number {
  const score = etfs.reduce((total, etf) => {
    const buyScore = calculateBuyScore(etf);

    return total + buyScore * (etf.weight / 100);
  }, 0);

  return score;
}

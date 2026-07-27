import type { ETF } from "../types/etf";

export async function getETFData(): Promise<ETF[]> {
  return [
    {
      name: "Core MSCI World",
      ticker: "EUNL.DE",
      price: 98.2,
      change: -0.5,
      ath: 125.4,
    },
    {
      name: "Nasdaq 100",
      ticker: "SXRV",
      price: 210.5,
      change: -1.2,
      ath: 250.0,
    },
  ];
}

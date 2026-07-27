import axios from "axios";
import type { ETF } from "../types/etf";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

export async function fetchETFInfo(symbol: string): Promise<ETF> {
  const response = await api.get(`/quote/${symbol}`);

  return response.data;
}

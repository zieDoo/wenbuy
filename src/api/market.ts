import axios from "axios";
import type { ETF } from "../types/etf";

// This part was for local development with hardset URL

// const api = axios.create({
//   baseURL: "http://localhost:3001/api",
// });

// This can decide between Vercel and local development

const api = axios.create({
  baseURL: import.meta.env.DEV ? "http://localhost:3001/api" : "/api",
});

export async function fetchETFInfo(symbol: string): Promise<ETF> {
  const response = await api.get(`/quote/${symbol}`);

  return response.data;
}

export async function searchETFs(query: string) {
  const response = await api.get("/search", {
    params: { query },
  });
  return response.data;
}

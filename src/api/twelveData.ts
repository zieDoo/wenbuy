import axios from "axios";

const API_KEY = import.meta.env.VITE_TWELVE_DATA_API_KEY;

const api = axios.create({
  baseURL: "https://api.twelvedata.com",
});

export async function fetchETFInfo(symbol: string) {
  const response = await api.get("/quote", {
    params: {
      symbol,
      //   exchange,
      apikey: API_KEY,
    },
  });

  return response.data;
}

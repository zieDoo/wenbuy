import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export async function fetchETFInfo(symbol: string) {
  const quote = await yahooFinance.quote(symbol);

  return quote;
}

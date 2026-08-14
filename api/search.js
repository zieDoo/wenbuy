import { error } from "console";
import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export default async function handler(req, res) {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    const results = await yahooFinance.search(query);

    const etfs = results.quotes
      .filter((quote) => quote.quoteType === "ETF")
      .map((quote) => ({
        symbol: quote.symbol,
        name: quote.longname || quote.shortname,
        exchange: quote.exchDisp,
      }));

    res.status(200).json(etfs);
  } catch (error) {
    req.status(500).json({
      error: error.message,
    });
  }
}

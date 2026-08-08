// const YahooFinance = require("yahoo-finance2").default;

import YahooFinance from "yahoo-finance2";

const yahooFinance = new YahooFinance();

export default async function handler(req, res) {
  try {
    const { symbol } = req.query;

    const quote = await yahooFinance.quote(symbol);

    res.status(200).json({
      symbol: quote.symbol,
      name: quote.longName,
      price: quote.reqularMarketPrice,
      currency: quote.currency,
      changePercent: quote.reqularMarketChangePercent,
      exchange: quote.fullExchangeName,
      high52: quote.fiftyTwoWeekHigh,
      low52: quote.fiftyTwoWeekLow,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
}

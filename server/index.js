const express = require("express");
const cors = require("cors");
const YahooFinance = require("yahoo-finance2").default;

const app = express();

app.use(cors());

const yahooFinance = new YahooFinance();

app.get("/api/quote/:symbol", async (req, res) => {
  try {
    const quote = await yahooFinance.quote(req.params.symbol);
    res.json({
      symbol: quote.symbol,
      name: quote.longName,
      price: quote.regularMarketPrice,
      currency: quote.currency,
      changePercent: quote.regularMarketChangePercent,
      exchange: quote.fullExchangeName,
      high52: quote.fiftyTwoWeekHigh,
      low52: quote.fiftyTwoWeekLow,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

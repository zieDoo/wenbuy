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

app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.query;

    if (!query) {
      return res.status(400).json({
        error: "Search query is required",
      });
    }

    // try {
    //   const symbol = `${query}.DE`;
    //   console.log(symbol);
    //   const quote = await yahooFinance.quote(symbol);
    //   console.log(quote);

    //   if (quote.quoteType === "ETF") {
    //     return res.json([quote]);
    //   }
    // } catch (error) {}

    // const symbol = `${query}.DE`;
    // console.log(symbol);

    // const quote = await yahooFinance.quote(symbol);
    // console.log(quote);

    const results = await yahooFinance.search(query);

    console.log(results.quotes);

    const etfs = results.quotes
      .filter((quote) => quote.quoteType === "ETF")
      // .filter((quote) => quote.exchange === "GER")
      .map((quote) => ({
        symbol: quote.symbol,
        name: quote.longname || quote.shortname,
        exchange: quote.exchDisp,
      }));

    res.json(etfs);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});

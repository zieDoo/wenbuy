import ETFCard from "./components/ETFCard";
import { useEffect, useState } from "react";
// import { getETFData } from "./services/etfService";
import type { ETF } from "./types/etf";
// import { getQuote } from "./api/twelveData";
// import { fetchETFInfo } from "./api/twelveData";
import { fetchETFInfo } from "./api/market";
import { etfs } from "./data/etfs";
import { calculatePortfolioScore } from "./utils/portfolioScore";
import ETFSearch from "./components/ETFSearch";
import "./App.css";
import { availableEtfs } from "./data/availableEtfs";

// 1st attempt - AI

// const App = () => {
//   const [portfolio, setPortfolio] = useState<ETF[]>([]);

//   useEffect(() => {
//     const loadETF = async () => {
//       const data = await getETFData();
//       setPortfolio(data);
//     };

//     loadETF();
//   }, []);

//   const updateETF = (updatedETF: ETF) => {
//     const updatedPortfolio = portfolio.map((etf) => {
//       return etf.ticker === updatedETF.ticker ? updatedETF : etf;
//     });

//     setPortfolio(updatedPortfolio);
//   };

//   return (
//     <div>
//       <h1>WenBuy</h1>
//       <p>Know when to buy.</p>

//       {/* <div className="dashboard">
//         {etfs.map((etf) => (
//           <ETFCard key={etf.ticker} etf={etf} />
//         ))}
//       </div> */}

//       <div className="dashboard">
//         {portfolio.map((etf) => (
//           <ETFCard key={etf.ticker} etf={etf} updateETF={updateETF} />
//         ))}
//       </div>
//     </div>
//   );
// };

// 2nd attempt - AI ---------------

// function App() {
//   const [etf, setEtf] = useState<ETFInfo | null>(null);

//   useEffect(() => {
//     fetchETFInfo("SXRV.DE")
//       .then((data) => {
//         console.log(data);
//         setEtf(data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>WenBuy</h1>

//       {etf && (
//         <>
//           <h2>{etf.name}</h2>

//           <p>
//             Price: {etf.price} {etf.currency}
//           </p>

//           <p>Change: {etf.changePercent}%</p>

//           <p>Exchange: {etf.exchange}</p>
//         </>
//       )}
//     </div>
//   );
// }

// export default App;

// 3rd attempt - AI

function App() {
  const REFRESH_INTERFVAL = 10000;
  const [portfolio, setPortfolio] = useState<ETF[]>([]);

  function removeETF(symbol: string) {
    setPortfolio((currentPortfolio) =>
      currentPortfolio.filter((etf) => etf.symbol !== symbol),
    );
  }

  async function addETF(etf: (typeof etfs)[number]) {
    if (portfolio.some((item) => item.symbol === etf.symbol)) {
      return;
    }
    const marketData = await fetchETFInfo(etf.symbol);

    // console.log("NEW ETF MARKET DATA:", marketData);
    const newETF = { ...etf, ...marketData, weight: 0 };

    console.log("NEW ETF: ", newETF);
    setPortfolio((currentPortfolio) => [...currentPortfolio, newETF]);
  }

  const portfolioScore = calculatePortfolioScore(portfolio);

  async function loadETF(etfsToLoad: typeof etfs) {
    const data = await Promise.all(
      etfsToLoad.map(async (etf) => {
        const marketData = await fetchETFInfo(etf.symbol);

        return {
          ...etf,
          ...marketData,
          name: etf.name,
        };
      }),
    );

    console.log("LOADED ETF:", data);

    setPortfolio(data);

    // setPortfolio(
    //   data.map((item, index) => ({
    //     ...item,
    //     name: etfs[index].name,
    //   })),
    // );
  }

  useEffect(() => {
    loadETF(etfs);

    const intervalId = setInterval(() => loadETF(etfs), REFRESH_INTERFVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="app">
      <header className="app-header">
        <h1>WenBuy</h1>
        <p>Know when to buy.</p>
      </header>

      <section className="dashboard-top">
        <div className="score-card">
          <span className="score-label">Portfolio Score</span>
          <strong className="score-value">
            {portfolioScore.toFixed(0)}
            <span>/ 100</span>
          </strong>
          <div className="score-bar">
            <div
              className="score-bar-fill"
              style={{ width: `${portfolioScore}%` }}
            ></div>
          </div>
        </div>

        <div className="search-card">
          <span className="search-label">Add an ETF</span>
          <ETFSearch onAdd={addETF} />
        </div>
      </section>

      <section className="portfolio-section">
        <h2>Your ETFs</h2>

        <div className="card-container">
          {portfolio.map((etf) => (
            <ETFCard key={etf.symbol} etf={etf} onRemove={removeETF} />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;

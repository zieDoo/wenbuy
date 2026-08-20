import ETFCard from "./components/ETFCard";
import { useEffect, useRef, useState } from "react";
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
  const portfolioRef = useRef<ETF[]>([]);

  function removeETF(symbol: string) {
    setPortfolio((currentPortfolio) => {
      const updatedPortfolio = currentPortfolio.filter(
        (etf) => etf.symbol !== symbol,
      );
      portfolioRef.current = updatedPortfolio;

      return updatedPortfolio;
    });
  }

  async function addETF(etf: (typeof availableEtfs)[number]) {
    if (portfolio.some((item) => item.symbol === etf.symbol)) {
      return;
    }
    const marketData = await fetchETFInfo(etf.symbol);

    // console.log("NEW ETF MARKET DATA:", marketData);
    const newETF = { ...etf, ...marketData, weight: null };

    console.log("NEW ETF: ", newETF);
    setPortfolio((currentPortfolio) => {
      const updatedPortfolio = [...currentPortfolio, newETF];
      portfolioRef.current = updatedPortfolio;

      return updatedPortfolio;
    });
  }

  const portfolioScore = calculatePortfolioScore(portfolio);

  async function loadETF(etfsToLoad: typeof etfs) {
    const data = await Promise.all(
      etfsToLoad.map(async (etf) => {
        const marketData = await fetchETFInfo(etf.symbol);

        return {
          ...etf,
          ...marketData,
          // name: etf.name,
        };
      }),
    );

    console.log("LOADED ETF:", data);

    setPortfolio(data);
    portfolioRef.current = data;

    // setPortfolio(
    //   data.map((item, index) => ({
    //     ...item,
    //     name: etfs[index].name,
    //   })),
    // );
  }

  //setPortfolio aktualizuje React state, ktorý používame na UI.
  // portfolioRef.current sme museli aktualizovať preto, že náš intervalový refresh číta dáta práve z refu.
  function togglePortfolio(etf: ETF) {
    setPortfolio((currentPortolio) => {
      const updatedPortfolio = currentPortolio.map((item) => {
        if (item.symbol === etf.symbol) {
          return {
            ...item, // zachova vsetky existujuce udaje
            weight: item.weight === null ? 0 : null,
          };
        }
        return item;
      });
      portfolioRef.current = updatedPortfolio;
      return updatedPortfolio;
    });
  }

  function weightChange(symbol: string, newWeight: number) {
    const reduced = portfolio.reduce((total, actual) => {
      if (actual.symbol === symbol) {
        return total;
      } else {
        return total + (actual.weight ?? 0);
      }
    }, 0);

    if (
      Number.isInteger(newWeight) &&
      newWeight >= 0 &&
      reduced + newWeight <= 100
    ) {
      setPortfolio((currentPortfolio) => {
        // const totalWeight = currentPortfolio.reduce((total, item) => {
        //   return total + (item.weight ?? 0); // Nullish coalescing operator: ak item.weight je cislo - pouzit to cislo. ak je item.weight null alebo undefined tak pouzi nulu.
        // }, 0);

        const updatedPortfolio = currentPortfolio.map((item) => {
          if (symbol === item.symbol) {
            return {
              ...item,
              weight: newWeight,
            };
          }
          return item;
        });
        portfolioRef.current = updatedPortfolio;
        return updatedPortfolio;
      });
    }
    return;
  }

  async function refreshPortfolio() {
    const updatedPortfolio = await Promise.all(
      portfolioRef.current.map(async (etf) => {
        const marketData = await fetchETFInfo(etf.symbol);

        return {
          ...etf,
          ...marketData,
        };
      }),
    );
    setPortfolio(updatedPortfolio);

    // await loadETF(portfolio);
  }

  useEffect(() => {
    loadETF(etfs);

    const intervalId = setInterval(refreshPortfolio, REFRESH_INTERFVAL);

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
            <ETFCard
              key={etf.symbol}
              etf={etf}
              onRemove={removeETF}
              onTogglePortfolio={togglePortfolio}
              onWeightChange={weightChange}
            />
          ))}
        </div>
      </section>
    </main>
  );
}

export default App;

import ETFCard from "./components/ETFCard";
import { useEffect, useState } from "react";
import { getETFData } from "./services/etfService";
import type { ETF } from "./types/etf";
// import { getQuote } from "./api/twelveData";
// import { fetchETFInfo } from "./api/twelveData";
import { fetchETFInfo } from "./api/market";
import { etfs } from "./data/etfs";

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

  async function loadETF() {
    const data = await Promise.all(etfs.map((etf) => fetchETFInfo(etf.symbol)));

    setPortfolio(
      data.map((item, index) => ({
        ...item,
        name: etfs[index].name,
      })),
    );
  }

  useEffect(() => {
    loadETF();

    const intervalId = setInterval(loadETF, REFRESH_INTERFVAL);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="dashboard">
      <header className="header">
        <h1>WenBuy</h1>
        <p>ETF buying assistant</p>
      </header>

      <div className="card-container">
        {portfolio.map((etf) => (
          <ETFCard key={etf.symbol} etf={etf} />
        ))}
      </div>
    </div>
  );
}

export default App;

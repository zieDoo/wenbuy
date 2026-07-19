import ETFCard from "./components/ETFCard";
import { etfs } from "./data/etfs";
import { useState } from "react";
import type { ETF } from "./types/etf";

const App = () => {
  const [portfolio, setPortfolio] = useState(etfs);

  const updateETF = (updatedETF: ETF) => {
    const updatedPortfolio = portfolio.map((etf) => {
      return etf.ticker === updatedETF.ticker ? updatedETF : etf;
    });

    setPortfolio(updatedPortfolio);
  };

  return (
    <div>
      <h1>WenBuy</h1>
      <p>Know when to buy.</p>

      {/* <div className="dashboard">
        {etfs.map((etf) => (
          <ETFCard key={etf.ticker} etf={etf} />
        ))}
      </div> */}

      <div className="dashboard">
        {portfolio.map((etf) => (
          <ETFCard key={etf.ticker} etf={etf} updateETF={updateETF} />
        ))}
      </div>
    </div>
  );
};

export default App;

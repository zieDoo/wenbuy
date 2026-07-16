import ETFCard from "./components/ETFCard";
import { etfs } from "./data/etfs";

const App = () => {
  return (
    <div>
      <h1>WenBuy</h1>
      <p>Know when to buy.</p>

      {etfs.map((etf) => (
        <ETFCard key={etf.ticker} etf={etf} />
      ))}
    </div>
  );
};

export default App;

import { useState } from "react";
import type { ETF } from "../types/etf";
import "./ETFCard.css";

type ETFCardProps = {
  etf: ETF;
  updateETF(etf: ETF): void;
};

const ETFCard = ({ etf, updateETF }: ETFCardProps) => {
  // aktualna hodnota = useState(default hodnota)
  // const [changeValue, setValueChange] = useState(etf.change);

  return (
    <div className="etf-card">
      <h2>{etf.name}</h2>
      <p className="ticker">{etf.ticker}</p>
      <p className="price">{etf.price} €</p>
      <p className="change">
        {etf.change > 0 ? "+" : ""}
        {etf.change}%
      </p>
      {/* <button onClick={() => setValueChange((prevValue) => prevValue + 0.1)}> */}
      <button onClick={() => updateETF({ ...etf, change: etf.change + 0.1 })}>
        change
      </button>
    </div>
  );
};

export default ETFCard;

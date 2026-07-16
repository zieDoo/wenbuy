import type { ETF } from "../types/etf";
import "./ETFCard.css";

type ETFCardProps = {
  etf: ETF;
};

const ETFCard = ({ etf }: ETFCardProps) => {
  return (
    <div className="etf-card">
      <h2>{etf.name}</h2>
      <p className="ticker">{etf.ticker}</p>
      <p className="price">{etf.price} €</p>
      <p className="change">
        {etf.change > 0 ? "+" : ""}
        {etf.change}%
      </p>
    </div>
  );
};

export default ETFCard;

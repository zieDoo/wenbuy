import type { ETF } from "../types/etf";

type ETFCardProps = {
  etf: ETF;
};

const ETFCard = ({ etf }: ETFCardProps) => {
  return (
    <div>
      <h2>{etf.name}</h2>
      <p>{etf.ticker}</p>
      <p>{etf.price}</p>
      <p>{etf.change}</p>
    </div>
  );
};

export default ETFCard;

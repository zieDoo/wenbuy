// import { useState } from "react";
import type { ETF } from "../types/etf";
import "./ETFCard.css";
import { getBuySignal } from "../utils/buySignal";
import { calculateBuyScore } from "../utils/buyScore";

// type ETFCardProps = {
//   etf: ETF;
//   updateETF(etf: ETF): void;
// };

// const ETFCard = ({ etf, updateETF }: ETFCardProps) => {
//   // Tu je useState priamo v karte. Ak by sme to nechali tak, tak by App o tom nevedela a zmena by sa vykonala len v karte.
//   // Tym ze sme stav posunuli do App (Lifting state UP), mame jedno jedine miesto pravdy.

//   // aktualna hodnota = useState(default hodnota)
//   // const [changeValue, setValueChange] = useState(etf.change);

//   const result = getBuySignal(etf);

//   return (
//     <div className="etf-card">
//       <h2>{etf.name}</h2>
//       <p className="ticker">{etf.ticker}</p>
//       <p className="price">Price Now: {etf.price} €</p>
//       <p className="change">
//         Change: {etf.change > 0 ? "+" : ""}
//         {etf.change.toFixed(2)}%
//       </p>
//       <p className={result.signal === "BUY" ? "buy" : "no-buy"}>
//         {result.signal}
//       </p>
//       <p>{result.reason}</p>
//       {/* <p>{result.dropPercentage} % - drop percentage</p> */}
//       <p>ATH: {etf.ath} €</p>
//       {/* <button onClick={() => setValueChange((prevValue) => prevValue + 0.1)}> */}
//       <button onClick={() => updateETF({ ...etf, price: etf.price - 1 })}>
//         change
//       </button>
//     </div>
//   );
// };

// export default ETFCard;

// 2nd attempt - gpt

interface ETFCardProps {
  etf: ETF;
}

function getBuycolor(drop: number) {
  const percent = Math.min(Math.abs(drop), 50);

  const hue = (percent / 50) * 120;

  return `hsl(${hue}, 80%, 50%)`;
}

function getCurrencySymbol(currency: string): string {
  switch (currency) {
    case "EUR":
      return "€";
    case "USD":
      return "$";
    case "GBP":
      return "£";
    default:
      return currency;
  }
}

function ETFCard({ etf }: ETFCardProps) {
  console.log(etf);
  const dropFromHigh = ((etf.price - etf.high52) / etf.high52) * 100;
  const buyColor = getBuycolor(dropFromHigh);

  const buyScore = calculateBuyScore(etf);

  return (
    <div className="etf-card">
      <h2>{etf.name}</h2>
      <p className="ticker">{etf.symbol}</p>

      {/* <p className="price">
        Price: {etf.price} {etf.currency}
      </p> */}

      <div className="stat">
        <span>Price:</span>
        <strong>
          {etf.price} {getCurrencySymbol(etf.currency)}
        </strong>
      </div>

      <div className="stat">
        <span>Change:</span>
        <strong>{etf.changePercent.toFixed(2)}%</strong>
      </div>
      {/* <p className="change">Change: {etf.changePercent.toFixed(2)}%</p> */}

      <div className="stat">
        <span>52W High:</span>
        <strong>
          {etf.high52} {getCurrencySymbol(etf.currency)}
        </strong>
      </div>
      {/* <p>52W High: {etf.high52}</p> */}

      <div className="stat">
        <span>Below High:</span>
        <strong>{dropFromHigh.toFixed(2)}%</strong>
      </div>
      {/* <p>Below High: {dropFromHigh.toFixed(2)}%</p> */}

      <div
        className="buy-indicator"
        style={{
          backgroundColor: buyColor,
        }}
      ></div>

      <div className="stat">
        <span>Weight:</span>
        <strong>{etf.weight}%</strong>
      </div>

      <div className="stat">
        <span>Buy Score:</span>
        <strong>{buyScore.toFixed(0)} / 100</strong>
      </div>
    </div>
  );
}

export default ETFCard;

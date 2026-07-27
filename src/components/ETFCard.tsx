// import { useState } from "react";
import type { ETF } from "../types/etf";
import "./ETFCard.css";
import { getBuySignal } from "../utils/buySignal";

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

function ETFCard({ etf }: ETFCardProps) {
  const dropFromHigh = ((etf.price - etf.high52) / etf.high52) * 100;

  return (
    <div>
      <h2>{etf.name}</h2>

      <p>
        Price: {etf.price} {etf.currency}
      </p>

      <p>Change: {etf.changePercent.toFixed(2)}%</p>

      <p>52W High: {etf.high52}</p>

      <p>Below High: {dropFromHigh.toFixed(2)}%</p>
    </div>
  );
}

export default ETFCard;

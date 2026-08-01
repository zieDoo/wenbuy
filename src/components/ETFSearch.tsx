import { useState } from "react";
import { availableEtfs } from "../data/availableEtfs";

// const ETFSearch = () => {
//     const [search, setSearch] = useState("")

//     const
// }

const ETFSearch = () => {
  const [search, setSearch] = useState("");

  const results = availableEtfs.filter((etf) =>
    etf.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search ETF..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div>
          {results.map((etf) => (
            <div key={etf.symbol}>
              <span>
                {etf.name} ({etf.symbol})
              </span>

              <button>Add</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ETFSearch;

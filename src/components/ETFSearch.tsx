import { useState } from "react";
import { availableEtfs } from "../data/availableEtfs";
import "./ETFSearch.css";

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
    <div className="etf-search">
      <input
        type="text"
        placeholder="Search ETF..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {search && (
        <div className="search-results">
          {results.map((etf) => (
            <div className="search-result" key={etf.symbol}>
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

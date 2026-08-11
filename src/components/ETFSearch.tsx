import { useState } from "react";
import { availableEtfs } from "../data/availableEtfs";
import "./ETFSearch.css";

interface ETFSearchProps {
  onAdd: (etf: (typeof availableEtfs)[number]) => void;
}

const ETFSearch = ({ onAdd }: ETFSearchProps) => {
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
            <div
              className="search-result"
              key={etf.symbol}
              onClick={() => {
                onAdd(etf);
                setSearch("");
              }}
            >
              <span>
                {etf.name} ({etf.symbol})
              </span>

              <button
                onClick={(e) => {
                  // Prevent the button click from bubbling to the parent row,
                  // which would otherwise add the ETF twice.
                  e.stopPropagation();
                  onAdd(etf);
                  setSearch("");
                }}
              >
                Add
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ETFSearch;

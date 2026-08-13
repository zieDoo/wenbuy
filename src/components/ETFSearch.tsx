import { useEffect, useState } from "react";
// import { availableEtfs } from "../data/availableEtfs";
import { fetchETFInfo, searchETFs } from "../api/market";
import type { ETFSearchResult } from "../types/etfSearch";
import "./ETFSearch.css";
import type { ETF } from "../types/etf";

interface ETFSearchProps {
  onAdd: (etf: ETF) => void;
}

const ETFSearch = ({ onAdd }: ETFSearchProps) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<ETFSearchResult[]>([]);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    searchETFs(search).then((data) => {
      setResults(data);
    });
  }, [search]);

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
              onClick={async () => {
                const fullETF = await fetchETFInfo(etf.symbol);
                onAdd(fullETF);
                setSearch("");
              }}
            >
              <span>
                {etf.name} ({etf.symbol})
              </span>

              <button
                onClick={async (e) => {
                  // Prevent the button click from bubbling to the parent row,
                  // which would otherwise add the ETF twice.
                  e.stopPropagation();
                  const fullETF = await fetchETFInfo(etf.symbol);
                  onAdd(fullETF);
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

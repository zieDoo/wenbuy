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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [adding, setAdding] = useState(false);

  const handleAdd = async (symbol: string) => {
    setAdding(true);
    try {
      const fullETF = await fetchETFInfo(symbol);

      onAdd(fullETF);
      setSearch("");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setAdding(false);
    }
  };

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setError("");
      return;
    }

    setError("");
    setLoading(true);

    searchETFs(search)
      .then((data) => {
        setResults(data);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
        setLoading(false);
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

      {loading && <p>Loading...</p>}
      {adding && <p>Adding ETF...</p>}
      {error && <p>{error}</p>}

      {!loading && !error && search && results.length === 0 && (
        <p>No ETFs found.</p>
      )}

      {search && (
        <div className="search-results">
          {results.map((etf) => (
            <div
              className="search-result"
              key={etf.symbol}
              onClick={
                () => handleAdd(etf.symbol)
                // setAdding(true);

                // handleAdd(etf.symbol);

                // try {
                //   const fullETF = await fetchETFInfo(etf.symbol);
                //   onAdd(fullETF);
                //   setSearch("");
                // } catch (error) {
                //   setError(error.message);
                // } finally {
                //   setAdding(false);
                //   // setSearch("");
                // }

                // setSearch("");
              }
            >
              <span>
                {etf.name} ({etf.symbol})
              </span>

              <button
                onClick={(e) => {
                  // Prevent the button click from bubbling to the parent row,
                  // which would otherwise add the ETF twice.
                  e.stopPropagation();

                  handleAdd(etf.symbol);

                  // const fullETF = await fetchETFInfo(etf.symbol);
                  // onAdd(fullETF);
                  // setSearch("");
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

import { useEffect, useRef, useState } from "react";
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
  const [isOpen, setIsOpen] = useState(false);

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

  // ref chceme pripojit na div (s etf-search). Tento ref bude obsahovat HTML div element.
  // Na zaciatku komponentu ten <div> este nemusi byt dostupny, takze jeho pociatocna hodnota je null.
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      setError("");
      setIsOpen(false);
      return;
    }

    setError("");
    setLoading(true);

    searchETFs(search)
      .then((data) => {
        setResults(data);
        setIsOpen(true);
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
        setIsOpen(false);
      });
  }, [search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Checking the event where user clicked.
      // console.log("TARGET: ", event.target);

      // Ak náš search element neobsahuje element, na ktorý používateľ klikol, znamená to, že klikol mimo
      if (!searchRef.current?.contains(event.target as Node)) {
        // setResults([]);
        setIsOpen(false);
      }
    };

    // Document, pocuvaj click event a ked sa stane, zavolaj handleClickOutside
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchRef} className="etf-search">
      <input
        id="etf-search"
        name="etf-search"
        type="text"
        placeholder="Search ETF..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="search-status">
        {loading && <p>Loading...</p>}
        {adding && <p>Adding ETF...</p>}
        {error && <p>{error}</p>}

        {!loading && !error && search && results.length === 0 && (
          <p>No ETFs found.</p>
        )}
      </div>

      {isOpen && (
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

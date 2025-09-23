import { useMemo, useState } from "react";
import { VEHICLES } from "./data/vehicles";
import type { Vehicle } from "./types";
import SearchBar from "./components/SearchBar";
import FilterPanel, { type FilterState } from "./components/FilterPanel";
import VehicleCard from "./components/VehicleCard";
import { isValidZip } from "./utils/validation";
import SortDropdown from "./components/SortDropdown";

export default function App() {
  const [searchZip, setSearchZip] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<string>("");

  const onSearch = (enteredZip: string) => {
    setError("");
    if (!enteredZip) {
      setError("Please enter a ZIP code.");
      return;
    }
    if (!isValidZip(enteredZip)) {
      setError("Invalid ZIP code. Please enter a 5-digit ZIP code.");
      return;
    }
    setSearchZip(enteredZip);
    setFilters({});
    setSortBy("");
  };

  const results = useMemo<Vehicle[]>(() => {
    if (!searchZip) return [];
    let list = VEHICLES.filter((v) => v.zip === searchZip);

    if (filters.make?.length)
      list = list.filter((v) => filters.make!.includes(v.make));
    if (filters.color?.length)
      list = list.filter((v) => filters.color!.includes(v.color));

    if (sortBy === "price-high")
      list = list.slice().sort((a, b) => b.price - a.price);
    else if (sortBy === "price-low")
      list = list.slice().sort((a, b) => a.price - b.price);
    else if (sortBy === "model")
      list = list.slice().sort((a, b) => a.model.localeCompare(b.model));

    return list;
  }, [searchZip, filters, sortBy]);

  return (
    <div className="app light">
      <header className="header" role="banner">
        <div className="header-left">
          <h1 className="logo">FLEXCAR</h1>
        </div>

        <div className="header-right">
          <SearchBar onSearch={onSearch} />
        </div>
      </header>

      {/* RESULTS TOP: moved one layer up (outside of sidebar/results body) */}
      {searchZip && (
        <div className="results-top" aria-hidden={false}>
          <h2 className="results-title">
            {`Results for ${searchZip} (${results.length})`}
          </h2>

          <div className="results-top-actions">
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      )}

      <main className="layout" role="main">
        <aside className="sidebar" aria-label="Filters">
          <FilterPanel
            vehicles={VEHICLES}
            filters={filters}
            setFilters={setFilters}
            results={results}
            searchZip={searchZip}
          />
        </aside>

        <section className="results" aria-live="polite">
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}

          <div className="results-body">
            {searchZip ? (
              results.length === 0 ? (
                <div className="empty" role="status">
                  No vehicles found for ZIP {searchZip} with the selected
                  filters.
                </div>
              ) : (
                <div className="grid" role="list">
                  {results.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              )
            ) : (
              <div className="callout">
                Enter a ZIP code above to find vehicles near you.
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

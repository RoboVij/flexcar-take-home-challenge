import { useMemo, useState } from "react";
import { VEHICLES } from "./data/vehicles";
import type { Vehicle } from "./types";
import SearchBar from "./components/SearchBar";
import FilterPanel, { type FilterState } from "./components/FilterPanel";
import VehicleCard from "./components/VehicleCard";
import SortDropdown from "./components/SortDropdown";
import { isValidZip } from "./utils/validation";
import styles from "./App.module.css";

export default function App() {
  const [searchZip, setSearchZip] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<string>("");

  const validateZip = (value: string) => {
    if (!value.trim()) {
      return "Please enter a ZIP code.";
    }
    if (!isValidZip(value)) {
      if (!/^\d+$/.test(value)) {
        return "ZIP must be numeric.";
      }
      return "Enter a valid 5-digit ZIP code.";
    }
    return null;
  };

  const onZipChange = (value: string) => {
    setZip(value);
    if (error) setError("");
  };

  const onSearch = (enteredZip: string) => {
    const validationError = validateZip(enteredZip);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSearchZip(enteredZip);
  };

  const zipResults = useMemo<Vehicle[]>(() => {
    if (!searchZip) return [];
    const list = VEHICLES.filter((v) => v.zip === searchZip);

    return list;
  }, [searchZip]);

  const results = useMemo<Vehicle[]>(() => {
    let list = zipResults;

    if (filters.make?.length)
      list = list.filter((v) => filters.make!.includes(v.make));
    if (filters.color?.length)
      list = list.filter((v) => filters.color!.includes(v.color));

    if (sortBy === "price-high")
      list = [...list].sort((a, b) => b.price - a.price);
    else if (sortBy === "price-low")
      list = [...list].sort((a, b) => a.price - b.price);
    else if (sortBy === "model")
      list = [...list].sort((a, b) => a.model.localeCompare(b.model));

    return list;
  }, [zipResults, filters, sortBy]);

  return (
    <div className={styles["app"]}>
      <header className={styles["header"]} role="banner">
        <div className={styles["header-left"]}>
          <h1 className={styles["logo"]}>FLEXCAR</h1>
        </div>

        <div className={styles["header-right"]}>
          <SearchBar zip={zip} onZipChange={onZipChange} onSearch={onSearch} />
        </div>
      </header>

      {searchZip && (
        <div className={styles["results-top"]} aria-hidden={false}>
          <h2 className={styles["results-title"]}>
            {`Results for ${searchZip} (${results.length})`}
          </h2>

          <div className={styles["results-top-actions"]}>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>
        </div>
      )}

      <main className={styles["layout"]} role="main">
        <aside className={styles["sidebar"]} aria-label="Filters">
          <FilterPanel
            vehicles={VEHICLES}
            filters={filters}
            setFilters={setFilters}
            results={zipResults}
            searchZip={searchZip}
          />
        </aside>

        <section className={styles["results"]} aria-live="polite">
          {error && (
            <div className={styles["error"]} role="alert">
              {error}
            </div>
          )}

          <div className={styles["results-body"]}>
            {!searchZip ? (
              <div className={styles["callout"]}>
                Enter a ZIP code above to find vehicles near you.
              </div>
            ) : isValidZip(searchZip) && results.length === 0 ? (
              <div className={styles["empty"]} role="status">
                No vehicles found for ZIP {searchZip}
                <span>
                  {filters.make?.length || filters.color?.length
                    ? "with the selected filters."
                    : "."}
                </span>
              </div>
            ) : (
              <div className={styles["grid"]} role="list">
                {results.map((v) => (
                  <VehicleCard key={v.id} vehicle={v} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

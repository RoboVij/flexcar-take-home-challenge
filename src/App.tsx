import { useMemo, useState } from "react";
import { VEHICLES } from "@/data/vehicles";
import type { Vehicle } from "@/types";
import SearchBar from "@/components/forms/SearchBar/SearchBar";
import FilterPanel, {
  type FilterState,
} from "@/components/panels/FilterPanel/FilterPanel";
import VehicleCard from "@/components/cards/VehicleCard/VehicleCard";
import SortDropdown from "@/components/ui/SortDropdown/SortDropdown";
import { isValidZip, getZipValidationError } from "@/utils/validation";
import styles from "./App.module.css";

export default function App() {
  const [searchZip, setSearchZip] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [filters, setFilters] = useState<FilterState>({});
  const [sortBy, setSortBy] = useState<string>("");

  const onSearch = (enteredZip: string) => {
    const validationError = getZipValidationError(enteredZip);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError("");
    setSearchZip(enteredZip);
  };

  const zipResults = useMemo<Vehicle[]>(() => {
    // Show all vehicles on initial load
    if (searchZip === "") return VEHICLES;
    // If searched for empty string, show no vehicles
    if (searchZip.trim() === "") return [];

    return VEHICLES.filter((v) => v.zip === searchZip);
  }, [searchZip]);

  const results = useMemo<Vehicle[]>(() => {
    let list = zipResults;

    if (filters.make?.length)
      list = list.filter((v) => filters.make!.includes(v.make));
    if (filters.color?.length)
      list = list.filter((v) => filters.color!.includes(v.color));

    return list;
  }, [zipResults, filters]);

  const sortedResults = useMemo<Vehicle[]>(() => {
    if (sortBy === "price-high")
      return [...results].sort((a, b) => b.price - a.price);
    else if (sortBy === "price-low")
      return [...results].sort((a, b) => a.price - b.price);
    else if (sortBy === "model")
      return [...results].sort((a, b) => a.model.localeCompare(b.model));
    return results;
  }, [results, sortBy]);

  return (
    <div className={styles["app"]}>
      <header className={styles["header"]} role="banner">
        <div className={styles["header-left"]}>
          <h1 className={styles["logo"]}>FLEXCAR</h1>
        </div>

        <div className={styles["header-right"]}>
          <SearchBar onSearch={onSearch} />
        </div>
      </header>

      <div className={styles["results-top"]} aria-hidden={false}>
        <h2 className={styles["results-title"]}>
          {searchZip ? `Results for ${searchZip} (${results.length})` : ""}
        </h2>
        <div className={styles["results-top-actions"]}>
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
      </div>

      <main className={styles["layout"]} role="main">
        <aside className={styles["sidebar"]} aria-label="Filters">
          <FilterPanel
            vehicles={VEHICLES}
            filters={filters}
            setFilters={setFilters}
            results={zipResults}
          />
        </aside>

        <section className={styles["results"]} aria-live="polite">
          {error ? (
            <div className={styles["error"]} role="alert">
              {error}
            </div>
          ) : (
            <div className={styles["results-body"]}>
              {isValidZip(searchZip) && results.length === 0 ? (
                <div className={styles["empty"]} role="status">
                  No vehicles found for ZIP {searchZip}
                  <span>
                    {filters.make?.length || filters.color?.length
                      ? " with the selected filters."
                      : "."}
                  </span>
                </div>
              ) : (
                <div className={styles["grid"]} role="list">
                  {sortedResults.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              )}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

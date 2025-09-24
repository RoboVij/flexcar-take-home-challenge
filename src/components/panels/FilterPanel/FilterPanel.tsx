import type { Vehicle } from "@/types";
import FilterChips from "@/components/ui/FilterChips/FilterChips";
import FilterSection from "@/components/ui/FilterSection/FilterSection";
import styles from "./FilterPanel.module.css";

export interface FilterState {
  [key: string]: string[] | undefined;
  make?: string[];
  color?: string[];
}

interface Props {
  vehicles: Vehicle[];
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  results: Vehicle[];
}

export default function FilterPanel({
  vehicles,
  filters,
  setFilters,
  results,
}: Props) {
  return (
    <div className={styles["filter-panel"]}>
      <div className={styles["filter-panel-header"]}>
        <h2 className={styles["filter-panel-title"]}>Filters</h2>
        {Object.values(filters).some((arr) => arr && arr.length > 0) && (
          <button
            className={styles["clear-all"]}
            onClick={() => setFilters({})}
            aria-label="Clear all filters"
          >
            Clear all
          </button>
        )}
      </div>

      <FilterChips filters={filters} setFilters={setFilters} />

      <FilterSection
        vehicles={vehicles}
        results={results}
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  );
}

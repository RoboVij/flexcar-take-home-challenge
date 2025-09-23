import type { FilterState } from "./FilterPanel";
import { VEHICLES } from "../data/vehicles";
import COLORS from "../constants/colors";
import styles from "./FilterChips.module.css";

interface Props {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

export default function FilterChips({ filters, setFilters }: Props) {
  const entries = Object.entries(filters).flatMap(([type, values]) =>
    (values ?? []).map((v: string) => ({ type, value: v }))
  );

  if (!entries.length) return null;

  const remove = (type: string, value: string) => {
    const cur = (filters[type] as string[]) ?? [];
    const next = cur.filter((x: string) => x !== value);
    setFilters({ ...filters, [type]: next });
  };
  // Get all main color names from COLORS constant
  const mainColors = Object.keys(COLORS);
  // Get all color names from vehicles that are not main colors
  const othersColors = Array.from(new Set(VEHICLES.map((v) => v.color))).filter(
    (c) => !mainColors.includes(c)
  );

  return (
    <div
      className={styles["filter-chips"]}
      role="toolbar"
      aria-label="Active filters"
    >
      {entries.map(({ type, value }) => {
        let label = value;
        if (type === "color" && othersColors.includes(value)) {
          label = "Others";
        }
        return (
          <span
            key={`${type}-${value}`}
            className={styles["chip"]}
            aria-pressed="false"
          >
            <span className={styles["chip-label"]}>{label}</span>
            <button
              aria-label={`Remove filter ${value}`}
              onClick={() => remove(type, value)}
              className={styles["chip-close"]}
            >
              ×
            </button>
          </span>
        );
      })}
    </div>
  );
}

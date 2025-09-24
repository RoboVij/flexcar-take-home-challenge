import type { FilterState } from "@/components/panels/FilterPanel/FilterPanel";
import { VEHICLES } from "@/data/vehicles";
import COLORS from "@/constants/colors";
import styles from "./FilterChips.module.css";
import { useMemo } from "react";

interface Props {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

export default function FilterChips({ filters, setFilters }: Props) {
  const entries = useMemo(
    () =>
      Object.entries(filters).flatMap(([type, values]) =>
        (values ?? []).map((v: string) => ({ type, value: v }))
      ),
    [filters]
  );

  const mainColors = useMemo(() => Object.keys(COLORS), []);
  const othersColors = useMemo(
    () =>
      Array.from(new Set(VEHICLES.map((v) => v.color))).filter(
        (c) => !mainColors.includes(c)
      ),
    [mainColors]
  );

  if (!entries.length) return null;

  const remove = (type: string, value: string) => {
    const cur = (filters[type] as string[]) ?? [];
    const next = cur.filter((x: string) => x !== value);
    setFilters({ ...filters, [type]: next });
  };

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

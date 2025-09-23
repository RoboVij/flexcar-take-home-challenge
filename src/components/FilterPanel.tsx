import { useMemo, useState } from "react";
import type { Vehicle } from "../types";
import FilterChips from "./FilterChips";
import styles from "./FilterPanel.module.css";

export interface FilterState {
  make?: string[];
  color?: string[];
}

interface Props {
  vehicles: Vehicle[];
  filters: FilterState;
  setFilters: (f: FilterState) => void;
  results: Vehicle[];
  searchZip: string;
}

const COLORS: Record<string, string> = {
  White: "#ffffff",
  Black: "#000000",
  Red: "#e63946",
  Gray: "#808080",
  Silver: "#c0c0c0",
  Brown: "#8b5e3c",
};

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

export default function FilterPanel({
  vehicles,
  filters,
  setFilters,
  results,
  searchZip,
}: Props) {
  // Use results and searchZip from props for correct counts
  const makes = useMemo(() => {
    const makeCounts: Record<string, number> = {};
    results.forEach((v: Vehicle) => {
      makeCounts[v.make] = (makeCounts[v.make] || 0) + 1;
    });
    return Array.from(new Set(vehicles.map((v) => v.make)))
      .sort()
      .map((make) => ({ name: make, count: makeCounts[make] || 0 }));
  }, [vehicles, results]);

  const colors = useMemo(() => {
    const colorCounts: Record<string, number> = {};
    results.forEach((v: Vehicle) => {
      colorCounts[v.color] = (colorCounts[v.color] || 0) + 1;
    });
    const allColors = Array.from(new Set(vehicles.map((v) => v.color)));
    const mainColors = allColors.filter((c) => Object.keys(COLORS).includes(c));
    const otherColors = allColors.filter(
      (c) => !Object.keys(COLORS).includes(c)
    );
    return {
      main: mainColors
        .sort()
        .map((color) => ({ name: color, count: colorCounts[color] || 0 })),
      others: otherColors
        .sort()
        .map((color) => ({ name: color, count: colorCounts[color] || 0 })),
    };
  }, [vehicles, results]);

  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    make: false,
    color: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((s) => ({ ...s, [key]: !s[key] }));
  };

  const toggleValue = (type: keyof FilterState, value: string) => {
    const current = filters[type] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ ...filters, [type]: next });
  };

  return (
    <div className={styles["filter-panel"]}>
      <div className={styles["filter-panel-header"]}>
        <h2 className={styles["filter-panel-title"]}>Filters</h2>
        <button
          className={styles["clear-all"]}
          onClick={() => setFilters({})}
          aria-label="Clear all filters"
        >
          Clear all
        </button>
      </div>
      <FilterChips filters={filters} setFilters={setFilters} />

      <div
        className={`${styles["accordion-section"]} ${openSections.make ? styles["open"] : ""}`}
      >
        <button
          className={styles["accordion-toggle"]}
          aria-expanded={!!openSections.make}
          aria-controls="panel-make"
          onClick={() => toggleSection("make")}
        >
          <span>Make</span>
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={styles["chev"]}
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        <div
          id="panel-make"
          className={styles["accordion-panel"]}
          hidden={!openSections.make}
        >
          <ul>
            {makes.map(({ name, count }) => {
              const id = `make-${slugify(name)}`;
              return (
                <li key={name}>
                  <label htmlFor={id}>
                    <input
                      id={id}
                      type="checkbox"
                      checked={filters.make?.includes(name) ?? false}
                      onChange={() => toggleValue("make", name)}
                    />
                    <span className={styles["label-text"]}>
                      {name}
                      {searchZip ? ` (${count})` : ""}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div
        className={`${styles["accordion-section"]} ${openSections.color ? styles["open"] : ""}`}
      >
        <button
          className={styles["accordion-toggle"]}
          aria-expanded={!!openSections.color}
          aria-controls="panel-color"
          onClick={() => toggleSection("color")}
        >
          <span>Exterior color</span>
          <svg
            aria-hidden
            width="18"
            height="18"
            viewBox="0 0 24 24"
            className={styles["chev"]}
          >
            <path
              d="M7 10l5 5 5-5"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </button>

        <div
          id="panel-color"
          className={styles["accordion-panel"]}
          hidden={!openSections.color}
        >
          <ul>
            {colors.main.map(({ name, count }) => {
              const id = `color-${slugify(name)}`;
              return (
                <li key={name}>
                  <label
                    htmlFor={id}
                    className={`${styles["color-label"]} ${styles["color-label-main"]}`}
                  >
                    <div className={styles["color-label-flex"]}>
                      <input
                        id={id}
                        type="checkbox"
                        checked={filters.color?.includes(name) ?? false}
                        onChange={() => toggleValue("color", name)}
                      />
                      <span className={styles["label-text"]}>
                        {name}
                        {searchZip && count > 0 ? ` (${count})` : ""}
                      </span>
                    </div>
                    <span
                      className={`${styles["color-swatch"]} ${styles["color-swatch-main"]}`}
                      aria-hidden
                      style={{ background: COLORS[name] ?? "#ccc" }}
                    />
                  </label>
                </li>
              );
            })}
            {colors.others.length > 0 && (
              <li key="others">
                <label
                  className={`${styles["color-label"]} ${styles["color-label-others"]}`}
                >
                  <div className={styles["color-label-flex"]}>
                    <input
                      id="color-others"
                      type="checkbox"
                      checked={
                        filters.color?.some((c) =>
                          colors.others.map((o) => o.name).includes(c)
                        ) ?? false
                      }
                      onChange={() => {
                        // Toggle all 'others' colors at once
                        const othersNames = colors.others.map((o) => o.name);
                        const current = filters.color ?? [];
                        const hasAll = othersNames.every((c) =>
                          current.includes(c)
                        );
                        const next = hasAll
                          ? current.filter((c) => !othersNames.includes(c))
                          : Array.from(new Set([...current, ...othersNames]));
                        setFilters({ ...filters, color: next });
                      }}
                    />
                    <span className={styles["label-text"]}>
                      Others
                      {searchZip &&
                      colors.others.reduce((acc, o) => acc + o.count, 0) > 0
                        ? ` (${colors.others.reduce((acc, o) => acc + o.count, 0)})`
                        : ""}
                    </span>
                  </div>
                  <div className={styles["color-label-others-row"]}>
                    {colors.others.map(({ name }) => (
                      <span
                        key={name}
                        className={`${styles["color-swatch"]} ${styles["color-swatch-others"]}`}
                        aria-hidden
                        title={name}
                      />
                    ))}
                  </div>
                </label>
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

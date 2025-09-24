import { useState } from "react";
import type { Vehicle } from "@/types";
import type { FilterState } from "@/components/panels/FilterPanel/FilterPanel";
import Accordion from "@/components/ui/Accordion/Accordion";
import FilterCheckbox from "@/components/ui/FilterCheckbox/FilterCheckbox";
import ColorSwatch from "@/components/ui/ColorSwatch/ColorSwatch";
import styles from "./FilterSection.module.css";
import { useFilterData } from "@/hooks/useFilterData";

interface FilterSectionProps {
  vehicles: Vehicle[];
  results: Vehicle[];
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}

export default function FilterSection({
  vehicles,
  results,
  filters,
  setFilters,
}: FilterSectionProps) {
  const { makes, colors, COLORS } = useFilterData(vehicles, results);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    make: false,
    color: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleFilterValue = (type: keyof FilterState, value: string) => {
    const current = filters[type] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setFilters({ ...filters, [type]: next });
  };

  const toggleOthersColors = () => {
    const othersNames = colors.others.map((o) => o.name);
    const current = filters.color ?? [];
    const hasAll = othersNames.every((c) => current.includes(c));
    const next = hasAll
      ? current.filter((c) => !othersNames.includes(c))
      : Array.from(new Set([...current, ...othersNames]));
    setFilters({ ...filters, color: next });
  };

  const isOthersChecked = () => {
    return (
      filters.color?.some((c) =>
        colors.others.map((o) => o.name).includes(c)
      ) ?? false
    );
  };

  const getOthersCount = () => {
    return colors.others.reduce((acc, o) => acc + o.count, 0);
  };

  return (
    <>
      <Accordion
        title="Make"
        isOpen={openSections.make}
        onToggle={() => toggleSection("make")}
        panelId="panel-make"
      >
        <ul className={styles["filter-list"]}>
          {makes.map(({ name, count }) => (
            <FilterCheckbox
              key={name}
              id={`make-${name}`}
              name={name}
              checked={filters.make?.includes(name) ?? false}
              onChange={() => toggleFilterValue("make", name)}
              count={count}
            />
          ))}
        </ul>
      </Accordion>

      <Accordion
        title="Exterior color"
        isOpen={openSections.color}
        onToggle={() => toggleSection("color")}
        panelId="panel-color"
      >
        <ul className={styles["filter-list"]}>
          {/* Main Colors */}
          {colors.main.map(({ name, count }) => (
            <FilterCheckbox
              key={name}
              id={`color-${name}`}
              name={name}
              checked={filters.color?.includes(name) ?? false}
              onChange={() => toggleFilterValue("color", name)}
              count={count}
            >
              <ColorSwatch color={name} colorHex={COLORS[name]} />
            </FilterCheckbox>
          ))}

          {/* Other Colors */}
          {colors.others.length > 0 && (
            <FilterCheckbox
              id="color-others"
              name="Others"
              checked={isOthersChecked()}
              onChange={toggleOthersColors}
              count={getOthersCount()}
            >
              <ColorSwatch color="Others" />
            </FilterCheckbox>
          )}
        </ul>
      </Accordion>
    </>
  );
}

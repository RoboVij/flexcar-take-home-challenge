import { useMemo } from "react";
import type { Vehicle } from "../types";
import COLORS from "../constants/colors";

export interface FilterOption {
  name: string;
  count: number;
}

export interface ColorFilterData {
  main: FilterOption[];
  others: FilterOption[];
}

/**
 * Custom hook to compute filter options and counts based on vehicle data
 */
export function useFilterData(
  allVehicles: Vehicle[],
  filteredResults: Vehicle[]
) {
  const makes = useMemo(() => {
    const makeCounts: Record<string, number> = {};
    filteredResults.forEach((vehicle: Vehicle) => {
      makeCounts[vehicle.make] = (makeCounts[vehicle.make] || 0) + 1;
    });

    return Array.from(new Set(allVehicles.map((v) => v.make)))
      .sort()
      .map((make) => ({
        name: make,
        count: makeCounts[make] || 0,
      }));
  }, [allVehicles, filteredResults]);

  const colors = useMemo((): ColorFilterData => {
    const colorCounts: Record<string, number> = {};
    filteredResults.forEach((vehicle: Vehicle) => {
      colorCounts[vehicle.color] = (colorCounts[vehicle.color] || 0) + 1;
    });

    const allColors = Array.from(new Set(allVehicles.map((v) => v.color)));
    const mainColors = allColors.filter((color) =>
      Object.keys(COLORS).includes(color)
    );
    const otherColors = allColors.filter(
      (color) => !Object.keys(COLORS).includes(color)
    );

    return {
      main: mainColors.sort().map((color) => ({
        name: color,
        count: colorCounts[color] || 0,
      })),
      others: otherColors.sort().map((color) => ({
        name: color,
        count: colorCounts[color] || 0,
      })),
    };
  }, [allVehicles, filteredResults]);

  return {
    makes,
    colors,
    COLORS, // Export color mapping for ColorSwatch component
  };
}

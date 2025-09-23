// Extracted and improved filter-related types

export interface FilterState {
  [key: string]: string[] | undefined;
  make?: string[];
  color?: string[];
}

export interface FilterOption {
  name: string;
  count: number;
}

export interface ColorFilterData {
  main: FilterOption[];
  others: FilterOption[];
}

export interface FilterToggleHandler {
  (type: keyof FilterState, value: string): void;
}

export interface FilterSectionState {
  [key: string]: boolean;
}

// Color constants with proper typing
export const COLOR_PALETTE: Record<string, string> = {
  White: "#ffffff",
  Black: "#000000", 
  Red: "#e63946",
  Gray: "#808080",
  Silver: "#c0c0c0",
  Brown: "#8b5e3c",
} as const;

export type ColorName = keyof typeof COLOR_PALETTE;

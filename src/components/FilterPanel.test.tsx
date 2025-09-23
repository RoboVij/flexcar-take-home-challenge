import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import FilterPanel, { type FilterState } from "./FilterPanel";
import type { Vehicle } from "../types";

describe("FilterPanel", () => {
  const vehicles: Vehicle[] = [
    {
      id: "1",
      make: "Toyota",
      model: "Camry",
      year: 2020,
      trim: "SE",
      mileage: 15000,
      price: 22000,
      color: "Red",
      zip: "10001",
      imageUrl: "https://placehold.co/800x450?text=Toyota+Camry",
    },
    {
      id: "2",
      make: "Honda",
      model: "Civic",
      year: 2019,
      trim: "EX",
      mileage: 20000,
      price: 18000,
      color: "Black",
      zip: "10001",
      imageUrl: "https://placehold.co/800x450?text=Honda+Civic",
    },
  ];

  it("renders filter options and chips", () => {
    const filters: FilterState = { make: ["Toyota"], color: ["Red"] };
    const setFilters = jest.fn();
    render(
      <FilterPanel
        vehicles={vehicles}
        filters={filters}
        setFilters={setFilters}
        results={vehicles}
        searchZip="10001"
      />
    );
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
  });
});

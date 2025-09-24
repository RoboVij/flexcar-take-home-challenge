import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import FilterSection from "./FilterSection";

describe("FilterSection", () => {
  const vehicles = [
    {
      id: "1",
      make: "Toyota",
      model: "Corolla",
      trim: "LE",
      year: 2021,
      color: "White",
      mileage: 15000,
      price: 17995,
      imageUrl: "",
      zip: "10001",
    },
    {
      id: "2",
      make: "Honda",
      model: "Civic",
      trim: "EX",
      year: 2020,
      color: "Black",
      mileage: 12000,
      price: 18995,
      imageUrl: "",
      zip: "10002",
    },
  ];
  const results = vehicles;
  const filters = { make: [], color: [] };
  const setFilters = jest.fn();

  it("renders filter section", () => {
    const { getByText } = render(
      <FilterSection
        vehicles={vehicles}
        results={results}
        filters={filters}
        setFilters={setFilters}
      />
    );
    expect(getByText(/Make/i)).toBeInTheDocument();
    expect(getByText(/Exterior color/i)).toBeInTheDocument();
  });

  it("renders filter options", () => {
    const { getByText } = render(
      <FilterSection
        vehicles={vehicles}
        results={results}
        filters={filters}
        setFilters={setFilters}
      />
    );
    expect(getByText("Toyota (1)")).toBeInTheDocument();
    expect(getByText("Honda (1)")).toBeInTheDocument();
    expect(getByText("White (1)")).toBeInTheDocument();
    expect(getByText("Black (1)")).toBeInTheDocument();
  });

  it("calls setFilters when option is clicked", () => {
    const { getByText, getByLabelText } = render(
      <FilterSection
        vehicles={vehicles}
        results={results}
        filters={filters}
        setFilters={setFilters}
      />
    );
    // Expand the 'Make' accordion to reveal checkboxes
    getByText(/Make/i).click();
    getByLabelText("Toyota (1)").click();
    expect(setFilters).toHaveBeenCalled();
  });

  it("calls setFilters when option is clicked (color)", () => {
    const { getByText, getByLabelText } = render(
      <FilterSection
        vehicles={vehicles}
        results={results}
        filters={filters}
        setFilters={setFilters}
      />
    );
    // Expand the 'Exterior color' accordion to reveal checkboxes
    getByText(/Exterior color/i).click();
    getByLabelText("Black (1)").click();
    expect(setFilters).toHaveBeenCalled();
  });
});

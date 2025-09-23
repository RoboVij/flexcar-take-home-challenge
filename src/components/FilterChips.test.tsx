import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterChips from "./FilterChips";

describe("FilterChips", () => {
  it("renders active filter chips and removes them", () => {
    const filters = { make: ["Toyota"], color: ["Red"] };
    const setFilters = jest.fn();
    render(<FilterChips filters={filters} setFilters={setFilters} />);
    expect(screen.getByText("Toyota")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
    fireEvent.click(screen.getByLabelText(/Remove filter Toyota/));
    expect(setFilters).toHaveBeenCalledWith({ ...filters, make: [] });
  });

  it("renders nothing if no filters", () => {
    const filters = {};
    const setFilters = jest.fn();
    const { container } = render(
      <FilterChips filters={filters} setFilters={setFilters} />
    );
    expect(container).toBeEmptyDOMElement();
  });
});

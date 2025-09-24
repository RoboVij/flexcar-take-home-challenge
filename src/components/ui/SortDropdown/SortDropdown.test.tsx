import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import SortDropdown from "./SortDropdown";

describe("SortDropdown", () => {
  it("renders sort options and changes selection", () => {
    let sortBy = "price-low";
    const setSortBy = (v: string) => {
      sortBy = v;
    };
    render(<SortDropdown sortBy={sortBy} setSortBy={setSortBy} />);
    expect(screen.getByText(/Price: Low/)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText(/Price: High/)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/Price: High/));
    expect(sortBy).toBe("price-high");
  });
});

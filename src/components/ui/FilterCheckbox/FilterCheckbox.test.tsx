import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
import FilterCheckbox from "./FilterCheckbox";

describe("FilterCheckbox", () => {
  it("renders label and checkbox", () => {
    const { getByRole, getByText } = render(
      <FilterCheckbox
        id="test"
        name="Test"
        checked={false}
        onChange={() => {}}
      />
    );
    expect(getByRole("checkbox")).toBeInTheDocument();
    expect(getByText("Test (undefined)")).toBeInTheDocument();
  });

  it("shows checked state", () => {
    const { getByRole } = render(
      <FilterCheckbox
        id="test"
        name="Test"
        checked={true}
        onChange={() => {}}
      />
    );
    expect(getByRole("checkbox")).toBeChecked();
  });

  it("calls onChange when clicked", () => {
    const handleChange = jest.fn();
    const { getByRole } = render(
      <FilterCheckbox
        id="test"
        name="Test"
        checked={false}
        onChange={handleChange}
      />
    );
    fireEvent.click(getByRole("checkbox"));
    expect(handleChange).toHaveBeenCalled();
  });

  // No disabled prop in FilterCheckbox, so skip this test.
});

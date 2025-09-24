import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "@/App";

describe("SearchBar via App", () => {
  it("renders input and button", () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/ZIP/)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /search/i })).toBeInTheDocument();
  });

  it("shows error for non-numeric input", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/ZIP/), {
      target: { value: "abcde" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/numeric/i);
  });

  it("shows error for invalid ZIP length", () => {
    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/ZIP/), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /search/i }));
    expect(screen.getByRole("alert")).toHaveTextContent(/valid 5-digit/i);
  });
});

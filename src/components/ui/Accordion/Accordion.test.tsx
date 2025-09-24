import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import Accordion from "./Accordion";

describe("Accordion", () => {
  const defaultProps = {
    title: "Test Section",
    isOpen: false,
    onToggle: jest.fn(),
    children: <div>Test content</div>,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the title", () => {
    render(<Accordion {...defaultProps} />);
    expect(screen.getByText("Test Section")).toBeInTheDocument();
  });

  it("shows content when open", () => {
    render(<Accordion {...defaultProps} isOpen={true} />);
    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("hides content when closed", () => {
    render(<Accordion {...defaultProps} isOpen={false} />);
    const panel = screen.getByText("Test content").parentElement;
    expect(panel).toHaveAttribute("hidden");
  });

  it("calls onToggle when button is clicked", () => {
    const onToggle = jest.fn();
    render(<Accordion {...defaultProps} onToggle={onToggle} />);
    
    const button = screen.getByRole("button");
    fireEvent.click(button);
    
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it("has correct aria attributes", () => {
    render(<Accordion {...defaultProps} isOpen={false} />);
    
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "false");
    expect(button).toHaveAttribute("aria-controls", "panel-test-section");
  });

  it("updates aria-expanded when open", () => {
    render(<Accordion {...defaultProps} isOpen={true} />);
    
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("aria-expanded", "true");
  });
});

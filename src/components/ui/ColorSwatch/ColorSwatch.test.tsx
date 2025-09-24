import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ColorSwatch from "./ColorSwatch";

describe("ColorSwatch", () => {
  it("renders with default props", () => {
    const { getByTitle } = render(<ColorSwatch color="White" />);
    expect(getByTitle("White")).toBeInTheDocument();
  });

  it("applies custom title", () => {
    const { getByTitle } = render(
      <ColorSwatch color="Red" title="Custom Title" />
    );
    expect(getByTitle("Custom Title")).toBeInTheDocument();
  });

  it("applies background from colorHex", () => {
    const { getByTitle } = render(
      <ColorSwatch color="Black" colorHex="#000000" />
    );
    const swatch = getByTitle("Black");
    expect(swatch).toHaveStyle({ background: "#000000" });
  });

  it("shows conic-gradient for 'Others'", () => {
    const { getByTitle } = render(<ColorSwatch color="Others" />);
    const swatch = getByTitle("Others");
    expect(swatch.style.background).toContain("conic-gradient");
  });

  it("sets correct size class", () => {
    const { container } = render(<ColorSwatch color="White" size="small" />);
    expect(container.firstChild).toHaveClass("color-swatch-small");
  });
});

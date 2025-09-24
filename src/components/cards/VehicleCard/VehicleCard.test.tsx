import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import VehicleCard from "./VehicleCard";
import type { Vehicle } from "@/types";

describe("VehicleCard", () => {
  const vehicle: Vehicle = {
    id: "1",
    make: "Toyota",
    model: "Camry",
    year: 2020,
    trim: "SE",
    mileage: 15000,
    price: 22000,
    color: "Silver",
    zip: "10001",
    imageUrl: "https://placehold.co/800x450?text=Toyota+Camry",
  };

  it("renders vehicle info", () => {
    render(<VehicleCard vehicle={vehicle} />);
    expect(screen.getByText(/Toyota Camry/)).toBeInTheDocument();
    expect(screen.getByText(/2020/)).toBeInTheDocument();
    expect(screen.getByText(/SE/)).toBeInTheDocument();
    expect(screen.getByText(/15,000 miles/)).toBeInTheDocument();
    expect(screen.getByText(/\$22,000/)).toBeInTheDocument();
  });

  it("renders vehicle image", () => {
    render(<VehicleCard vehicle={vehicle} />);
    const img = screen.getByAltText(/Toyota Camry/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute("src", vehicle.imageUrl);
  });
});

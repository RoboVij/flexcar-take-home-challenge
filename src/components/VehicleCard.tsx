import type { Vehicle } from "../types";

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

const VehicleCard: React.FC<{ vehicle: Vehicle }> = ({ vehicle }) => {
  return (
    <article
      className="vehicle-card"
      aria-label={`${vehicle.year} ${vehicle.make} ${vehicle.model}`}
    >
      <div className="vehicle-image">
        <img src={vehicle.imageUrl} alt={`${vehicle.make} ${vehicle.model}`} />
      </div>
      <div className="vehicle-info">
        <h3>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>
        <p className="trim">{vehicle.trim ?? ""}</p>
        <p>
          <strong>Color:</strong> {vehicle.color}
        </p>
        <p>
          <strong>Mileage:</strong> {vehicle.mileage.toLocaleString()} miles
        </p>
        <p className="price">{currency(vehicle.price)}</p>
      </div>
    </article>
  );
};

export default VehicleCard;

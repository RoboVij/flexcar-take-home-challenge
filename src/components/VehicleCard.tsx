import type { Vehicle } from "../types";

const PLACEHOLDER =
  "https://placehold.co/800x450?text=No+Image&bg=efefef&fg=6b7280";

const currency = (n: number) =>
  n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <article
      className="vehicle-card"
      role="listitem"
      aria-labelledby={`title-${vehicle.id}`}
    >
      <div className="vehicle-image" aria-hidden="true">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          onError={(e) => {
            // replace broken images with a placeholder
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            (e.currentTarget as HTMLImageElement).alt = "No image available";
          }}
        />
      </div>

      <div className="vehicle-info">
        <h3 id={`title-${vehicle.id}`}>
          {vehicle.year} {vehicle.make} {vehicle.model}
        </h3>

        <p className="meta">
          {vehicle.trim ?? ""} · {vehicle.mileage.toLocaleString()} miles ·{" "}
          {vehicle.color}
        </p>

        <p className="price">{currency(vehicle.price)}</p>
      </div>
    </article>
  );
}

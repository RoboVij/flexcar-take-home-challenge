import type { Vehicle } from "../types";
import styles from "./VehicleCard.module.css";

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
      className={styles["vehicle-card"]}
      role="listitem"
      aria-labelledby={`title-${vehicle.id}`}
    >
      <div className={styles["vehicle-image"]} aria-hidden="true">
        <img
          src={vehicle.imageUrl}
          alt={`${vehicle.make} ${vehicle.model}`}
          loading="lazy"
          onError={(e) => {
            // replace broken images with a placeholder
            (e.currentTarget as HTMLImageElement).src = PLACEHOLDER;
            (e.currentTarget as HTMLImageElement).alt = "No image available";
          }}
        />
      </div>

      <div className={styles["vehicle-info"]}>
        <h3 id={`title-${vehicle.id}`}>
          {vehicle.year} · {vehicle.make} {vehicle.model}
        </h3>

        <p className={styles["meta"]}>
          {vehicle.trim ?? ""} · {vehicle.mileage.toLocaleString()} miles ·{" "}
          {vehicle.color}
        </p>

        <p className={styles["price"]}>{currency(vehicle.price)}</p>
      </div>
    </article>
  );
}

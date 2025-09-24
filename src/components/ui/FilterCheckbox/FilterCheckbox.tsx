import type { ReactNode } from "react";
import styles from "./FilterCheckbox.module.css";

interface FilterCheckboxProps {
  id: string;
  name: string;
  checked: boolean;
  onChange: () => void;
  count?: number;
  children?: ReactNode; // For additional elements like color swatches
  className?: string;
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-_]/g, "");
}

export default function FilterCheckbox({
  id,
  name,
  checked,
  onChange,
  count,
  children,
  className = "",
}: FilterCheckboxProps) {
  const checkboxId = id || `filter-${slugify(name)}`;

  return (
    <li>
      <label
        htmlFor={checkboxId}
        className={`${styles["filter-label"]} ${className}`}
      >
        <div className={styles["filter-content"]}>
          <input
            id={checkboxId}
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className={styles["filter-checkbox"]}
          />
          <span className={styles["label-text"]}>{`${name} (${count})`}</span>
        </div>
        {children}
      </label>
    </li>
  );
}

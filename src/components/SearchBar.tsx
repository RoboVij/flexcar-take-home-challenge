import { useState } from "react";
import styles from "./SearchBar.module.css";

interface Props {
  onSearch: (zip: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [zip, setZip] = useState("");

  return (
    <form
      className={styles["search-bar"]}
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(zip.trim());
      }}
      role="search"
      aria-label="Search by ZIP code"
    >
      <label htmlFor="zip" className={styles["visually-hidden"]}>
        ZIP code
      </label>
      <input
        id="zip"
        name="zip"
        placeholder="ZIP (e.g. 10001, 94105)"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        inputMode="numeric"
        pattern="\d*"
        aria-label="ZIP code"
        className={styles["search-bar-input"]}
      />
      <button type="submit" className={styles["primary"]} aria-label="Search">
        Search
      </button>
    </form>
  );
}

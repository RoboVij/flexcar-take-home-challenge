import styles from "./SearchBar.module.css";

interface Props {
  zip: string;
  onZipChange: (zip: string) => void;
  onSearch: (zip: string) => void;
}

export default function SearchBar({ zip, onZipChange, onSearch }: Props) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(zip.trim());
  };

  return (
    <form
      className={styles["search-bar"]}
      onSubmit={handleSubmit}
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
        onChange={(e) => onZipChange(e.target.value)}
        aria-label="ZIP code"
        className={styles["search-bar-input"]}
      />
      <button type="submit" className={styles["primary"]} aria-label="Search">
        Search
      </button>
    </form>
  );
}

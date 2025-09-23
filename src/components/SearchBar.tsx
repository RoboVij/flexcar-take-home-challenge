import { useState } from "react";

interface Props {
  onSearch: (zip: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [zip, setZip] = useState("");

  return (
    <form
      className="search-bar"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch(zip.trim());
      }}
      role="search"
      aria-label="Search by ZIP code"
    >
      <label htmlFor="zip" className="visually-hidden">
        ZIP code
      </label>
      <input
        id="zip"
        name="zip"
        placeholder="ZIP (e.g. 10001)"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        inputMode="numeric"
        pattern="\d*"
        aria-label="ZIP code"
      />
      <button type="submit" className="primary" aria-label="Search">
        Search
      </button>
    </form>
  );
}

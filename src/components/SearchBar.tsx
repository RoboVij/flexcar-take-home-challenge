import { useState } from "react";

interface SearchProps {
  onSearch: (zip: string) => void;
}

const SearchBar: React.FC<SearchProps> = ({ onSearch }) => {
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(zip.trim());
  };

  return (
    <form
      className="search-bar"
      onSubmit={(e) => handleSubmit(e)}
      aria-label="ZIP search form"
    >
      <label htmlFor="zip">ZIP code</label>
      <input
        id="zip"
        type="text"
        value={zip}
        onChange={(e) => setZip(e.target.value)}
        inputMode="numeric"
        pattern="\d*"
      />
      <button type="submit" className="primary">
        Search
      </button>
    </form>
  );
};

export default SearchBar;

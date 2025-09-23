import { useMemo, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import type { Vehicle } from "./types";
import { VEHICLES } from "./data/vehicles";
import VehicleCard from "./components/VehicleCard";
import Filters from "./components/Filters";
import { isValidZip } from "./utils.ts/validation";

function uniqueSorted<T>(arr: T[], keyFn: (a: T) => string) {
  return Array.from(new Set(arr.map(keyFn))).sort();
}

function App() {
  const [zip, setZip] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [error, setError] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [sortBy, setSortBy] = useState("");

  const makes = useMemo(() => {
    return uniqueSorted(VEHICLES, (v) => v.make);
  }, []);
  const colors = useMemo(() => {
    return uniqueSorted(VEHICLES, (v) => v.color);
  }, []);

  const onSearch = (enteredZip: string) => {
    setError("");
    if (!enteredZip) {
      setError("Please enter a ZIP code.");
      return;
    }
    if (!isValidZip(enteredZip)) {
      setError("Invalid ZIP code. Please enter a 5-digit ZIP code.");
      return;
    }
    setSearchZip(enteredZip);
    setZip(enteredZip);
    // reset filters on new search
    setSelectedMake("");
    setSelectedColor("");
    setSortBy("");
  };

  const results = useMemo<Vehicle[]>(() => {
    if (!searchZip) return [];
    let list = VEHICLES.filter((v) => v.zip === searchZip);
    if (selectedMake) {
      list = list.filter((v) => v.make === selectedMake);
    }
    if (selectedColor) {
      list = list.filter((v) => v.color === selectedColor);
    }
    if (sortBy === "price-high") {
      list = list.slice().sort((a, b) => b.price - a.price);
    } else if (sortBy === "price-low") {
      list = list.slice().sort((a, b) => a.price - b.price);
    } else if (sortBy === "model") {
      list = list.slice().sort((a, b) => a.model.localeCompare(b.model));
    }
    return list;
  }, [searchZip, selectedMake, selectedColor, sortBy]);

  return (
    <div className="app">
      <header className="header">
        <h1>Vehicle Inventory</h1>
        <p className="subtitle">Search available vehicles by ZIP code</p>
      </header>

      <main>
        <section className="search-section">
          <SearchBar onSearch={onSearch} />
          {error && (
            <div className="error" role="alert">
              {error}
            </div>
          )}
        </section>

        <section className="filters-section">
          <Filters
            makes={makes}
            colors={colors}
            selectedMake={selectedMake}
            selectedColor={selectedColor}
            sortBy={sortBy}
            onMakeChange={setSelectedMake}
            onColorChange={setSelectedColor}
            onSortChange={setSortBy}
          />
        </section>

        <section className="results-section">
          {searchZip ? (
            <>
              <h2>Results for {searchZip}</h2>
              {results.length === 0 ? (
                <div className="empty" role="status">
                  No vehicles found for ZIP {searchZip} with the selected
                  filters.
                </div>
              ) : (
                <div className="grid">
                  {results.map((v) => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="callout">
              Enter a ZIP code above to find vehicles near you.
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;

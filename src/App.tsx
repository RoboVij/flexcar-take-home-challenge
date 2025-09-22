import { useMemo, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar";
import type { Vehicle } from "./types";
import { VEHICLES } from "./data/vehicles";
import VehicleCard from "./components/VehicleCard";

function App() {
  const [zip, setZip] = useState("");
  const [searchZip, setSearchZip] = useState("");
  const [error, setError] = useState("");

  const onSearch = (enteredZip: string) => {
    setError("");
    if (!enteredZip) {
      setError("Please enter a ZIP code.");
      return;
    }
    setSearchZip(enteredZip);
    setZip(enteredZip);
  };

  const results = useMemo<Vehicle[]>(() => {
    if (!searchZip) return [];
    let list = VEHICLES.filter((v) => v.zip === searchZip);
    return list;
  }, [searchZip]);

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

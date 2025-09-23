interface FiltersProps {
  makes: string[];
  colors: string[];
  selectedMake: string;
  selectedColor: string;
  sortBy: string;
  onMakeChange: (m: string) => void;
  onColorChange: (c: string) => void;
  onSortChange: (s: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  makes,
  colors,
  selectedMake,
  selectedColor,
  sortBy,
  onMakeChange,
  onColorChange,
  onSortChange,
}) => {
  return (
    <div className="filters">
      <div className="filters-row">
        <div className="filter-item">
          <label htmlFor="make">Make</label>
          <select
            id="make"
            value={selectedMake}
            onChange={(e) => onMakeChange(e.target.value)}
          >
            <option value="">All makes</option>
            {makes.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="color">Color</label>
          <select
            id="color"
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
          >
            <option value="">All colors</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-item">
          <label htmlFor="sort">Sort by</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="">Default</option>
            <option value="price-high">Price: High to Low</option>
            <option value="price-low">Price: Low to High</option>
            <option value="model">Model (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;

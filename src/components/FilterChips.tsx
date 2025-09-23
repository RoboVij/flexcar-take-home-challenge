import type { FilterState } from "./FilterPanel";

interface Props {
  filters: FilterState;
  setFilters: (f: FilterState) => void;
}

export default function FilterChips({ filters, setFilters }: Props) {
  const entries = Object.entries(filters).flatMap(([type, values]) =>
    (values ?? []).map((v) => ({ type, value: v }))
  );

  if (!entries.length) return null;

  const remove = (type: string, value: string) => {
    const cur = (filters as any)[type] ?? [];
    const next = cur.filter((x: string) => x !== value);
    setFilters({ ...filters, [type]: next });
  };

  return (
    <div className="filter-chips" role="toolbar" aria-label="Active filters">
      {entries.map(({ type, value }) => (
        <span key={`${type}-${value}`} className="chip" aria-pressed="false">
          <span className="chip-label">{value}</span>
          <button
            aria-label={`Remove filter ${value}`}
            onClick={() => remove(type, value)}
            className="chip-close"
          >
            ×
          </button>
        </span>
      ))}
    </div>
  );
}

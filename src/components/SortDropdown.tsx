import { useEffect, useRef, useState } from "react";

const options = [
  { value: "price-low", label: "Price: Low → High" },
  { value: "price-high", label: "Price: High → Low" },
  { value: "model", label: "Model (A → Z)" },
];

export default function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: string;
  setSortBy: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const current = options.find((o) => o.value === sortBy);

  useEffect(() => {
    function handleOutside(ev: MouseEvent | TouchEvent) {
      if (!ref.current) return;
      if (!(ev.target instanceof Node)) return;
      if (!ref.current.contains(ev.target)) setOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("touchstart", handleOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("touchstart", handleOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="custom-dropdown" ref={ref}>
      <button
        type="button"
        className="dropdown-toggle"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span>{current ? current.label : "Sort by"}</span>
        <span className="chev" aria-hidden>
          ▾
        </span>
      </button>

      {open && (
        <ul className="dropdown-list" role="listbox" aria-label="Sort options">
          {options.map((o) => (
            <li key={o.value}>
              <button
                type="button"
                role="option"
                aria-selected={sortBy === o.value}
                onClick={() => {
                  setSortBy(o.value);
                  setOpen(false);
                }}
                className={sortBy === o.value ? "selected" : undefined}
              >
                {o.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

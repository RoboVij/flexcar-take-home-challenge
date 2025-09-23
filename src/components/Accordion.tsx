import type { ReactNode } from "react";
import styles from "./Accordion.module.css";

interface AccordionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
  panelId?: string;
}

export default function Accordion({ 
  title, 
  isOpen, 
  onToggle, 
  children, 
  panelId = `panel-${title.toLowerCase().replace(/\s+/g, '-')}` 
}: AccordionProps) {
  return (
    <div className={`${styles["accordion-section"]} ${isOpen ? styles["open"] : ""}`}>
      <button
        className={styles["accordion-toggle"]}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        type="button"
      >
        <span>{title}</span>
        <svg
          aria-hidden="true"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          className={styles["chev"]}
        >
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </button>

      <div
        id={panelId}
        className={styles["accordion-panel"]}
        hidden={!isOpen}
      >
        {children}
      </div>
    </div>
  );
}

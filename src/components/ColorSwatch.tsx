import styles from "./ColorSwatch.module.css";

interface ColorSwatchProps {
  color: string;
  colorHex?: string;
  title?: string;
  size?: "small" | "medium";
  className?: string;
}

export default function ColorSwatch({ 
  color, 
  colorHex, 
  title,
  size = "medium",
  className = "" 
}: ColorSwatchProps) {
  const swatchStyle = {
    background: colorHex || "#ccc"
  };

  return (
    <span
      className={`${styles["color-swatch"]} ${styles[`color-swatch-${size}`]} ${className}`}
      style={swatchStyle}
      title={title || color}
      aria-hidden="true"
    />
  );
}

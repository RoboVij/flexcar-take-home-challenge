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
  className = "",
}: ColorSwatchProps) {
  const swatchStyle = {
    background:
      color === "Others" && !colorHex
        ? "conic-gradient(from 180deg at 50% 50%, #e900ec, #00ffcd 127.79999613761902deg, #4249ff 248.39999914169312deg, #e900ec)"
        : colorHex,
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

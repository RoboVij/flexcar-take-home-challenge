export function isValidZip(zip: string): boolean {
  // Accept 5-digit US ZIP codes only
  return /^\d{5}$/.test(zip.trim());
}

export function getZipValidationError(zip: string): string | null {
  if (!zip.trim()) {
    return "Please enter a ZIP code.";
  }
  if (!isValidZip(zip)) {
    if (!/^\d+$/.test(zip)) {
      return "ZIP must be numeric.";
    }
    return "Enter a valid 5-digit ZIP code.";
  }
  return null;
}

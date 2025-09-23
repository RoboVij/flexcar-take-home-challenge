export function isValidZip(zip: string): boolean {
  // Accept 5-digit US ZIP codes only
  return /^\d{5}$/.test(zip.trim());
}

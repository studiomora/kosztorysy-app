export function formatMoney(value: number | string, currency: "PLN" | "EUR") {
  const num = typeof value === "string" ? parseFloat(value) : value;
  const formatted = (Number.isFinite(num) ? num : 0).toLocaleString("pl-PL", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return currency === "PLN" ? `${formatted} zł` : `${formatted} €`;
}

export function toNumber(value: number | string | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const num = typeof value === "string" ? parseFloat(value) : value;
  return Number.isFinite(num) ? num : 0;
}

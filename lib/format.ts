const SYMBOLS: Record<string, string> = {
  USD: "$",
  INR: "₹",
  EUR: "€",
};

export function formatCurrency(amount: number, currency = "INR"): string {
  const symbol = SYMBOLS[currency] ?? "₹";
  const locale = currency === "INR" ? "en-IN" : "en-US";
  const value = Number.isFinite(amount) ? Math.round(amount) : 0;
  return `${symbol}${value.toLocaleString(locale)}`;
}

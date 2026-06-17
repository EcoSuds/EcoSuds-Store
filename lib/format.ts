export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("en-PK", {
    style: "currency",
    currency,
    maximumFractionDigits: 0
  }).format(price);
}

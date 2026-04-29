export function formatPrice(amount) {
  const numericAmount = Number(amount)

  if (!Number.isFinite(numericAmount)) {
    return '₦0'
  }

  return `₦${new Intl.NumberFormat('en-NG', {
    maximumFractionDigits: 0,
  }).format(Math.round(numericAmount))}`
}

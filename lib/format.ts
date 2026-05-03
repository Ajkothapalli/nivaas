export function formatRent(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`
}

export function formatArea(sqft: number): string {
  return `${sqft.toLocaleString('en-IN')} sq ft`
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })
}

export function formatBHK(bhk: number): string {
  return `${bhk} BHK`
}

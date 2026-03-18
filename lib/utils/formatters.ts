export function formatPrice(cents: number | null): string {
  if (cents === null || cents === 0) return 'free'
  const dollars = cents / 100
  return `$${dollars.toFixed(2)}`
}

export function formatLamports(lamports: number): string {
  const sol = lamports / 1_000_000_000
  return `${sol.toFixed(4)} SOL`
}

export function formatDate(iso: string): string {
  const date = new Date(iso)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function formatAddress(address: string, chars: number = 4): string {
  if (address.length <= chars * 2 + 3) return address
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

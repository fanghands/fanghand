'use client'

export function WalletBalance() {
  return (
    <div className="flex items-center gap-4 text-[12px] font-mono">
      <div>
        <span className="text-[var(--muted)]">SOL </span>
        <span className="text-[var(--green)]">2.45</span>
      </div>
      <div>
        <span className="text-[var(--muted)]">FGH </span>
        <span className="text-[var(--green)]">15,000</span>
      </div>
    </div>
  )
}

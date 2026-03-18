'use client'

export function FGHDiscountBadge({ discount = 20 }: { discount?: number }) {
  return (
    <span className="inline-block border border-[var(--green)] text-[var(--green)] text-[10px] px-1.5 py-0.5 font-mono">
      {discount}% off with $FGH
    </span>
  )
}

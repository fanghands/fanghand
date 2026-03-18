'use client'

import { useBurnStats } from '@/lib/hooks/useBurnStats'

export function BurnTicker() {
  const { totalBurned, lastBurn } = useBurnStats()

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
      <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-2">
        $FGH burned (all time)
      </div>
      <div className="text-[24px] text-[var(--green)] tabular-nums">
        {totalBurned.toLocaleString()}
      </div>
      <div className="text-[10px] text-[var(--muted)] mt-1">
        last burn: {lastBurn.amount.toLocaleString()} FGH ({lastBurn.ago})
      </div>
    </div>
  )
}

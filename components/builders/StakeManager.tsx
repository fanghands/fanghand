'use client'

import { useState } from 'react'

export function StakeManager() {
  const [staked] = useState(5000)
  const [lockDays] = useState(23)
  const [risk] = useState<'low' | 'medium' | 'high'>('low')

  const riskColors = { low: 'var(--green)', medium: 'var(--amber)', high: 'var(--red)' }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">
        stake management
      </div>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">staked</span>
          <span className="text-[var(--green)]">{staked.toLocaleString()} FGH</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">lock period</span>
          <span className="text-[var(--white)]">{lockDays} days remaining</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">slash risk</span>
          <span style={{ color: riskColors[risk] }}>{risk}</span>
        </div>
        <button
          disabled={lockDays > 0}
          className="w-full border border-[var(--border)] text-[var(--muted)] px-3 py-2 disabled:opacity-30 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
        >
          {lockDays > 0 ? `[locked — ${lockDays}d remaining]` : '[release stake]'}
        </button>
      </div>
    </div>
  )
}

'use client'

const MOCK_DATA = [
  { month: 'Oct', amount: 45 },
  { month: 'Nov', amount: 78 },
  { month: 'Dec', amount: 120 },
  { month: 'Jan', amount: 95 },
  { month: 'Feb', amount: 156 },
  { month: 'Mar', amount: 210 },
]

export function EarningsChart() {
  const max = Math.max(...MOCK_DATA.map((d) => d.amount))

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
      <div className="text-[var(--muted)] mb-4">monthly earnings ($)</div>
      <div className="flex items-end gap-2 h-[150px]">
        {MOCK_DATA.map((d) => (
          <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
            <span className="text-[var(--green)] text-[10px]">${d.amount}</span>
            <div
              className="w-full bg-[var(--green)] opacity-70"
              style={{ height: `${(d.amount / max) * 120}px` }}
            />
            <span className="text-[var(--muted)] text-[10px]">{d.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

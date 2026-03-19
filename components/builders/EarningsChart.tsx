'use client'

const DEFAULT_DATA = [
  { month: 'Oct', amount: 0 },
  { month: 'Nov', amount: 0 },
  { month: 'Dec', amount: 0 },
  { month: 'Jan', amount: 0 },
  { month: 'Feb', amount: 0 },
  { month: 'Mar', amount: 0 },
]

interface Props {
  data?: Array<{ month: string; amount: number }>
}

export function EarningsChart({ data }: Props) {
  const chartData = data && data.length > 0 ? data : DEFAULT_DATA
  const max = Math.max(...chartData.map((d) => d.amount), 1)

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
      <div className="text-[var(--muted)] mb-4">monthly earnings ($)</div>
      <div className="flex items-end gap-2 h-[150px]">
        {chartData.map((d) => (
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

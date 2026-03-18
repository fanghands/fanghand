type Status = 'active' | 'paused' | 'error' | 'expired'

const CONFIG: Record<Status, { color: string; label: string }> = {
  active: { color: 'var(--green)', label: 'ACTIVE' },
  paused: { color: 'var(--amber)', label: 'PAUSED' },
  error: { color: 'var(--red)', label: 'ERROR' },
  expired: { color: 'var(--muted)', label: 'EXPIRED' },
}

export function HandStatusBadge({ status }: { status: Status }) {
  const { color, label } = CONFIG[status]
  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-mono">
      <span
        className="w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: color }}
      />
      <span style={{ color }}>{label}</span>
    </span>
  )
}

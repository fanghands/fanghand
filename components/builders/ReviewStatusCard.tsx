type ReviewStatus = 'pending' | 'approved' | 'rejected'

const CONFIG: Record<ReviewStatus, { border: string; text: string; label: string }> = {
  pending: { border: 'var(--amber)', text: 'var(--amber)', label: 'under review' },
  approved: { border: 'var(--green)', text: 'var(--green)', label: 'approved' },
  rejected: { border: 'var(--red)', text: 'var(--red)', label: 'rejected' },
}

interface ReviewStatusCardProps {
  status: ReviewStatus
  reason?: string
}

export function ReviewStatusCard({ status, reason }: ReviewStatusCardProps) {
  const { border, text, label } = CONFIG[status]
  return (
    <div
      className="p-3 font-mono text-[12px]"
      style={{ borderWidth: 1, borderStyle: 'solid', borderColor: border }}
    >
      <div style={{ color: text }}>{label}</div>
      {status === 'rejected' && reason && (
        <div className="text-[var(--muted)] mt-1">reason: {reason}</div>
      )}
    </div>
  )
}

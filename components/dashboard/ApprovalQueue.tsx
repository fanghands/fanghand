'use client'

import { useApprovalQueue } from '@/lib/hooks/useApprovalQueue'

const TYPE_COLORS: Record<string, string> = {
  tweet: 'var(--blue)',
  trade: 'var(--green)',
  email: 'var(--purple)',
  api_call: 'var(--cyan)',
}

export function ApprovalQueue() {
  const { items, approve, reject } = useApprovalQueue()

  return (
    <div
      className={`border bg-[var(--surface)] p-4 font-mono text-[12px] ${
        items.length > 0 ? 'border-[var(--amber)]' : 'border-[var(--border)]'
      }`}
    >
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3 flex items-center justify-between">
        <span>approval queue</span>
        {items.length > 0 && (
          <span className="text-[var(--amber)]">{items.length} pending</span>
        )}
      </div>
      {items.length === 0 && (
        <div className="text-[var(--muted)]">no pending approvals</div>
      )}
      <div className="space-y-2">
        {items.map((item) => (
          <div
            key={item.id}
            className="border border-[var(--border)] p-3 flex items-start justify-between gap-3"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-[10px] px-1.5 py-0.5 border"
                  style={{
                    color: TYPE_COLORS[item.actionType] || 'var(--muted)',
                    borderColor: TYPE_COLORS[item.actionType] || 'var(--border)',
                  }}
                >
                  {item.actionType}
                </span>
                <span className="text-[var(--muted)]">{item.timestamp}</span>
              </div>
              <div className="text-[var(--white)]">{item.description}</div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                onClick={() => approve(item.id)}
                className="border border-[var(--green)] text-[var(--green)] px-2 py-1 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [approve]
              </button>
              <button
                onClick={() => reject(item.id)}
                className="border border-[var(--muted-2)] text-[var(--muted)] px-2 py-1 hover:border-[var(--red)] hover:text-[var(--red)] transition-all duration-150"
              >
                [reject]
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

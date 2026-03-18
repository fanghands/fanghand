'use client'

import { useState } from 'react'

interface RunRow {
  id: string
  hand: string
  status: 'completed' | 'failed' | 'running'
  tier: string
  cost: string
  started: string
  duration: string
}

const STATUS_COLORS: Record<string, string> = {
  completed: 'var(--green)',
  failed: 'var(--red)',
  running: 'var(--amber)',
}

interface RunHistoryTableProps {
  runs: RunRow[]
  pageSize?: number
}

export function RunHistoryTable({ runs, pageSize = 10 }: RunHistoryTableProps) {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(runs.length / pageSize)
  const pageRuns = runs.slice(page * pageSize, (page + 1) * pageSize)

  return (
    <div className="font-mono text-[12px]">
      <div className="border border-[var(--border)] overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[var(--border)] text-[var(--muted)]">
              <th className="text-left px-3 py-2 font-normal">hand</th>
              <th className="text-left px-3 py-2 font-normal">status</th>
              <th className="text-left px-3 py-2 font-normal">tier</th>
              <th className="text-right px-3 py-2 font-normal">cost</th>
              <th className="text-left px-3 py-2 font-normal">started</th>
              <th className="text-right px-3 py-2 font-normal">duration</th>
            </tr>
          </thead>
          <tbody>
            {pageRuns.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] hover:bg-[var(--surface-2)]">
                <td className="px-3 py-2 text-[var(--white)]">{r.hand}</td>
                <td className="px-3 py-2" style={{ color: STATUS_COLORS[r.status] }}>
                  {r.status}
                </td>
                <td className="px-3 py-2 text-[var(--muted)]">{r.tier}</td>
                <td className="px-3 py-2 text-right text-[var(--white)]">{r.cost}</td>
                <td className="px-3 py-2 text-[var(--muted)]">{r.started}</td>
                <td className="px-3 py-2 text-right text-[var(--muted)]">{r.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-2 text-[var(--muted)]">
          <button
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="border border-[var(--border)] px-2 py-1 hover:border-[var(--green)] hover:text-[var(--green)] disabled:opacity-30 transition-all duration-150"
          >
            [prev]
          </button>
          <span>
            {page + 1} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page === totalPages - 1}
            className="border border-[var(--border)] px-2 py-1 hover:border-[var(--green)] hover:text-[var(--green)] disabled:opacity-30 transition-all duration-150"
          >
            [next]
          </button>
        </div>
      )}
    </div>
  )
}

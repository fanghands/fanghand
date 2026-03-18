'use client'

import Link from 'next/link'
import { HandStatusBadge } from './HandStatusBadge'

interface ActiveHandCardProps {
  id: string
  name: string
  status: 'active' | 'paused' | 'error' | 'expired'
  cycleInfo: string
  lastRun: string
  uptimePct: number
}

export function ActiveHandCard({
  id,
  name,
  status,
  cycleInfo,
  lastRun,
  uptimePct,
}: ActiveHandCardProps) {
  return (
    <Link href={`/dashboard/hands/${id}`}>
      <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] hover:border-[var(--border-active)] transition-all duration-150">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[var(--white)]">{name}</span>
          <HandStatusBadge status={status} />
        </div>
        <div className="space-y-1 text-[var(--muted)]">
          <div className="flex justify-between">
            <span>cycle</span>
            <span className="text-[var(--white)]">{cycleInfo}</span>
          </div>
          <div className="flex justify-between">
            <span>last run</span>
            <span className="text-[var(--white)]">{lastRun}</span>
          </div>
          <div className="flex justify-between">
            <span>uptime</span>
            <span className="text-[var(--green)]">{uptimePct}%</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

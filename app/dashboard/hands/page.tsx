'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { HandStatusBadge } from '@/components/dashboard/HandStatusBadge'

const MOCK_HANDS = [
  { id: 'act-1', name: 'alpha-scanner', status: 'active' as const, lastRun: '12 min ago', totalRuns: 23 },
  { id: 'act-2', name: 'tweet-composer', status: 'active' as const, lastRun: '3 min ago', totalRuns: 156 },
  { id: 'act-3', name: 'data-aggregator', status: 'paused' as const, lastRun: '2h ago', totalRuns: 8 },
]

export default function HandsPage() {
  return (
    <div className="space-y-4">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2">my hands</div>
      {MOCK_HANDS.map((hand, i) => (
        <motion.div
          key={hand.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[var(--white)] text-[14px]">{hand.name}</span>
            <HandStatusBadge status={hand.status} />
          </div>
          <div className="flex items-center gap-6 text-[var(--muted)] mb-3">
            <span>last run: {hand.lastRun}</span>
            <span>total runs: {hand.totalRuns}</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/dashboard/hands/${hand.id}`}
              className="border border-[var(--green)] text-[var(--green)] px-3 py-1 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
            >
              [manage]
            </Link>
            <button className="border border-[var(--border)] text-[var(--muted)] px-3 py-1 hover:border-[var(--amber)] hover:text-[var(--amber)] transition-all duration-150">
              [pause]
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

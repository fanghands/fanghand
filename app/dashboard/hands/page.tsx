'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { HandStatusBadge } from '@/components/dashboard/HandStatusBadge'
import { fetchActivations } from '@/lib/api/activations'

export default function HandsPage() {
  const { data } = useQuery({
    queryKey: ['activations'],
    queryFn: () => fetchActivations(),
  })

  const hands = (data?.data ?? []).map((a: any) => ({
    id: a.id,
    name: a.hand_name || 'Unknown',
    status: a.status as 'active' | 'paused' | 'expired',
    lastRun: a.created_at ? new Date(a.created_at).toLocaleDateString() : '—',
    totalRuns: 0,
  }))

  return (
    <div className="space-y-4">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2">my hands</div>
      {hands.length === 0 && (
        <div className="text-[var(--muted)] text-[12px] font-mono">no activated hands yet. visit the <Link href="/marketplace" className="text-[var(--green)] hover:underline">marketplace</Link> to get started.</div>
      )}
      {hands.map((hand: any, i: number) => (
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
          </div>
        </motion.div>
      ))}
    </div>
  )
}

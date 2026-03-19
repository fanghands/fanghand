'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'
import { fetchRunHistory } from '@/lib/api/runs'

export default function RunsPage() {
  const { data } = useQuery({
    queryKey: ['run-history'],
    queryFn: () => fetchRunHistory(),
  })

  const runs = (data?.data ?? []).map((r: any) => ({
    id: r.id,
    hand: r.hand_name,
    status: r.status as 'completed' | 'failed' | 'running',
    tier: r.tier,
    cost: r.lamports_charged ? `$${(r.lamports_charged / 1e9 * 150).toFixed(2)}` : '$0.00',
    started: r.queued_at ? new Date(r.queued_at).toLocaleString() : '—',
    duration: r.duration_ms ? `${Math.floor(r.duration_ms / 60000)}m ${Math.floor((r.duration_ms % 60000) / 1000)}s` : '—',
  }))

  return (
    <div className="space-y-4">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        run history
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        {runs.length === 0 ? (
          <div className="text-[var(--muted)] text-[12px] font-mono">no runs yet.</div>
        ) : (
          <RunHistoryTable runs={runs} pageSize={10} />
        )}
      </motion.div>
    </div>
  )
}

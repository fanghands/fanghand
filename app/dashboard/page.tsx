'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { ActiveHandCard } from '@/components/dashboard/ActiveHandCard'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'
import { fetchActivations } from '@/lib/api/activations'
import { getRecentRuns } from '@/lib/api/dashboard'

export default function DashboardPage() {
  const { data: activationsData } = useQuery({
    queryKey: ['activations'],
    queryFn: () => fetchActivations(),
  })

  const { data: runsData } = useQuery({
    queryKey: ['recent-runs'],
    queryFn: getRecentRuns as () => Promise<Array<{
      id: string; hand_name: string; status: string; tier: string;
      lamports_charged: number | null; queued_at: string | null;
      duration_ms: number | null;
    }>>,
  })

  const hands = (activationsData?.data ?? []).map((a: any) => ({
    id: a.id,
    name: a.hand_name || 'Unknown',
    status: a.status as 'active' | 'paused' | 'expired',
    cycleInfo: '',
    lastRun: a.created_at ? new Date(a.created_at).toLocaleDateString() : '—',
    uptimePct: 100,
  }))

  const runs = (runsData ?? []).map((r: any) => ({
    id: r.id,
    hand: r.hand_name,
    status: r.status as 'completed' | 'failed' | 'running',
    tier: r.tier,
    cost: r.lamports_charged ? `$${(r.lamports_charged / 1e9 * 150).toFixed(2)}` : '$0.00',
    started: r.queued_at ? new Date(r.queued_at).toLocaleString() : '—',
    duration: r.duration_ms ? `${Math.floor(r.duration_ms / 60000)}m ${Math.floor((r.duration_ms % 60000) / 1000)}s` : '—',
  }))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <DashboardOverview />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          active hands
        </div>
        {hands.length === 0 ? (
          <div className="text-[var(--muted)] text-[12px] font-mono">no active hands yet.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {hands.map((h: any) => (
              <ActiveHandCard key={h.id} {...h} />
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          recent runs
        </div>
        {runs.length === 0 ? (
          <div className="text-[var(--muted)] text-[12px] font-mono">no runs yet.</div>
        ) : (
          <RunHistoryTable runs={runs} />
        )}
      </motion.div>
    </div>
  )
}

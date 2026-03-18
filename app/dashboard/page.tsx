'use client'

import { motion } from 'framer-motion'
import { DashboardOverview } from '@/components/dashboard/DashboardOverview'
import { ActiveHandCard } from '@/components/dashboard/ActiveHandCard'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'

const MOCK_HANDS = [
  { id: 'act-1', name: 'alpha-scanner', status: 'active' as const, cycleInfo: 'every 4h', lastRun: '12 min ago', uptimePct: 99.2 },
  { id: 'act-2', name: 'tweet-composer', status: 'active' as const, cycleInfo: 'every 1h', lastRun: '3 min ago', uptimePct: 97.8 },
  { id: 'act-3', name: 'data-aggregator', status: 'active' as const, cycleInfo: 'every 6h', lastRun: '45 min ago', uptimePct: 100 },
]

const MOCK_RUNS = [
  { id: 'r1', hand: 'alpha-scanner', status: 'completed' as const, tier: 'deep', cost: '$3.75', started: '12 min ago', duration: '4m 12s' },
  { id: 'r2', hand: 'tweet-composer', status: 'completed' as const, tier: 'quick', cost: '$1.20', started: '1h ago', duration: '45s' },
  { id: 'r3', hand: 'data-aggregator', status: 'failed' as const, tier: 'deep', cost: '$0.00', started: '2h ago', duration: '1m 3s' },
  { id: 'r4', hand: 'alpha-scanner', status: 'completed' as const, tier: 'quick', cost: '$1.20', started: '4h ago', duration: '52s' },
  { id: 'r5', hand: 'tweet-composer', status: 'running' as const, tier: 'quick', cost: '$1.20', started: 'just now', duration: '—' },
]

export default function DashboardPage() {
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {MOCK_HANDS.map((h) => (
            <ActiveHandCard key={h.id} {...h} />
          ))}
        </div>
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
        <RunHistoryTable runs={MOCK_RUNS} />
      </motion.div>
    </div>
  )
}

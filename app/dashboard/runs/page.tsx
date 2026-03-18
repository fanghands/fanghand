'use client'

import { motion } from 'framer-motion'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'

const MOCK_RUNS = Array.from({ length: 18 }, (_, i) => ({
  id: `r${i + 1}`,
  hand: ['alpha-scanner', 'tweet-composer', 'data-aggregator'][i % 3],
  status: (['completed', 'completed', 'failed', 'completed', 'running'] as const)[i % 5],
  tier: i % 2 === 0 ? 'deep' : 'quick',
  cost: i % 5 === 2 ? '$0.00' : i % 2 === 0 ? '$3.75' : '$1.20',
  started: `${i + 1}h ago`,
  duration: i % 5 === 4 ? '—' : `${Math.floor(Math.random() * 5)}m ${Math.floor(Math.random() * 59)}s`,
}))

export default function RunsPage() {
  return (
    <div className="space-y-4">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        run history
      </div>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <RunHistoryTable runs={MOCK_RUNS} pageSize={10} />
      </motion.div>
    </div>
  )
}

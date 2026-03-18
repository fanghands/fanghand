'use client'

import { motion } from 'framer-motion'
import { StakeManager } from '@/components/builders/StakeManager'

const STATS = [
  { label: 'total earnings', value: '$704.25' },
  { label: 'active hands', value: '4' },
  { label: 'total activations', value: '89' },
  { label: 'pending review', value: '1' },
]

export default function BuildersOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono"
          >
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
              {stat.label}
            </div>
            <div className="text-[20px] text-[var(--white)] tabular-nums">{stat.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Pending review */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          pending review
        </div>
        <div className="border border-[var(--amber)] bg-[var(--surface)] p-4 font-mono text-[12px]">
          <div className="flex items-center justify-between">
            <span className="text-[var(--white)]">portfolio-tracker</span>
            <span className="text-[var(--amber)]">under review</span>
          </div>
          <div className="text-[var(--muted)] mt-1">submitted 3 days ago</div>
        </div>
      </motion.div>

      {/* Earnings chart placeholder */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          recent earnings
        </div>
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 h-[150px] flex items-center justify-center text-[var(--muted-2)] font-mono text-[12px]">
          [earnings chart area]
        </div>
      </motion.div>

      {/* Staking summary */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          staking status
        </div>
        <StakeManager />
      </motion.div>
    </div>
  )
}

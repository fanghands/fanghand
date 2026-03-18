'use client'

import { motion } from 'framer-motion'

const STATS = [
  { label: 'active hands', value: '3', trend: '+1 this week' },
  { label: 'total runs', value: '47', trend: '+12 this week' },
  { label: 'earned', value: '$12.50', trend: '+$3.20 this week' },
  { label: 'FGH balance', value: '15,000', trend: 'staked: 5,000' },
]

export function DashboardOverview() {
  return (
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
          <div className="text-[10px] text-[var(--green)] mt-1">{stat.trend}</div>
        </motion.div>
      ))}
    </div>
  )
}

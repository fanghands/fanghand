'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { getDashboardOverview } from '@/lib/api/dashboard'

interface Overview {
  active_hands_count: number
  total_runs: number
  total_spent_cents: number
  fgh_balance: number
}

export function DashboardOverview() {
  const { data } = useQuery<Overview>({
    queryKey: ['dashboard-overview'],
    queryFn: getDashboardOverview as () => Promise<Overview>,
  })

  const stats = [
    { label: 'active hands', value: data?.active_hands_count?.toString() ?? '—' },
    { label: 'total runs', value: data?.total_runs?.toString() ?? '—' },
    { label: 'spent', value: data ? `$${(data.total_spent_cents / 100).toFixed(2)}` : '—' },
    { label: 'FGH balance', value: data?.fgh_balance?.toLocaleString() ?? '—' },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
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
  )
}

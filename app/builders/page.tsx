'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { StakeManager } from '@/components/builders/StakeManager'
import { getBuilderProfile } from '@/lib/api/builders'

export default function BuildersOverviewPage() {
  const { data: builder } = useQuery({
    queryKey: ['builder-profile'],
    queryFn: getBuilderProfile as () => Promise<{
      total_revenue_cents: number
      total_hands: number
      total_activations: number
      tier: string
      is_verified: boolean
    }>,
  })

  const stats = [
    { label: 'total earnings', value: builder ? `$${(builder.total_revenue_cents / 100).toFixed(2)}` : '—' },
    { label: 'active hands', value: builder?.total_hands?.toString() ?? '—' },
    { label: 'total activations', value: builder?.total_activations?.toString() ?? '—' },
    { label: 'tier', value: builder?.tier ?? '—' },
  ]

  return (
    <div className="space-y-6">
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

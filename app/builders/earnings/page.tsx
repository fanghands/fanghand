'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { EarningsChart } from '@/components/builders/EarningsChart'
import { getBuilderEarnings } from '@/lib/api/builders'

export default function EarningsPage() {
  const { data: earnings } = useQuery({
    queryKey: ['builder-earnings'],
    queryFn: getBuilderEarnings as () => Promise<{
      total_cents: number
      pending_cents: number
      paid_cents: number
      monthly: Array<{ month: string; amount: number }>
    }>,
  })

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        earnings
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
              total earned
            </div>
            <div className="text-[20px] text-[var(--green)] tabular-nums">
              ${earnings ? (earnings.total_cents / 100).toFixed(2) : '0.00'}
            </div>
          </div>
          <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
              pending payout
            </div>
            <div className="text-[20px] text-[var(--amber)] tabular-nums">
              ${earnings ? (earnings.pending_cents / 100).toFixed(2) : '0.00'}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <EarningsChart data={earnings?.monthly} />
      </motion.div>
    </div>
  )
}

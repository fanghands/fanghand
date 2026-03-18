'use client'

import { motion } from 'framer-motion'
import { EarningsChart } from '@/components/builders/EarningsChart'

const MOCK_PAYOUTS = [
  { id: 'p1', date: 'Mar 1', amount: '$85.00', method: 'SOL', status: 'completed' },
  { id: 'p2', date: 'Feb 1', amount: '$156.00', method: 'SOL', status: 'completed' },
  { id: 'p3', date: 'Jan 1', amount: '$95.00', method: 'SOL', status: 'completed' },
  { id: 'p4', date: 'Dec 1', amount: '$120.00', method: 'SOL', status: 'completed' },
]

export default function EarningsPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        earnings
      </div>

      {/* Totals */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="grid grid-cols-2 gap-3">
          <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
              total earned
            </div>
            <div className="text-[20px] text-[var(--green)] tabular-nums">$704.25</div>
          </div>
          <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
            <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
              pending payout
            </div>
            <div className="text-[20px] text-[var(--amber)] tabular-nums">$78.75</div>
          </div>
        </div>
      </motion.div>

      {/* Chart */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <EarningsChart />
      </motion.div>

      {/* Payout history */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          payout history
        </div>
        <div className="border border-[var(--border)] font-mono text-[12px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="text-left px-3 py-2 font-normal">date</th>
                <th className="text-right px-3 py-2 font-normal">amount</th>
                <th className="text-left px-3 py-2 font-normal">method</th>
                <th className="text-left px-3 py-2 font-normal">status</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_PAYOUTS.map((p) => (
                <tr key={p.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-2 text-[var(--muted)]">{p.date}</td>
                  <td className="px-3 py-2 text-right text-[var(--green)]">{p.amount}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{p.method}</td>
                  <td className="px-3 py-2 text-[var(--green)]">{p.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

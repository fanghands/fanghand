'use client'

import { motion } from 'framer-motion'
import { StakeManager } from '@/components/builders/StakeManager'

const MOCK_HISTORY = [
  { id: 's1', action: 'stake', amount: '5,000 FGH', date: 'Feb 25', hand: 'alpha-scanner' },
  { id: 's2', action: 'stake', amount: '1,000 FGH', date: 'Jan 15', hand: 'tweet-composer' },
  { id: 's3', action: 'release', amount: '2,000 FGH', date: 'Dec 10', hand: 'old-bot' },
]

export default function StakingPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        staking
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <StakeManager />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          staking history
        </div>
        <div className="border border-[var(--border)] font-mono text-[12px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="text-left px-3 py-2 font-normal">action</th>
                <th className="text-right px-3 py-2 font-normal">amount</th>
                <th className="text-left px-3 py-2 font-normal">hand</th>
                <th className="text-left px-3 py-2 font-normal">date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_HISTORY.map((h) => (
                <tr key={h.id} className="border-b border-[var(--border)]">
                  <td
                    className="px-3 py-2"
                    style={{ color: h.action === 'stake' ? 'var(--green)' : 'var(--amber)' }}
                  >
                    {h.action}
                  </td>
                  <td className="px-3 py-2 text-right text-[var(--white)]">{h.amount}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{h.hand}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  )
}

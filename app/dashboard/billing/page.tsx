'use client'

import { motion } from 'framer-motion'
import { CreditWalletDeposit } from '@/components/payments/CreditWalletDeposit'

const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'deposit', amount: '+$15.00', date: '2 days ago', method: 'SOL' },
  { id: 't2', type: 'charge', amount: '-$3.75', date: '1 day ago', method: 'credit' },
  { id: 't3', type: 'charge', amount: '-$1.20', date: '12h ago', method: 'credit' },
  { id: 't4', type: 'deposit', amount: '+$7.50', date: '6h ago', method: 'SOL' },
  { id: 't5', type: 'charge', amount: '-$1.20', date: '2h ago', method: 'FGH' },
]

export default function BillingPage() {
  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        billing
      </div>

      {/* Credit balance */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
          <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
            credit wallet balance
          </div>
          <div className="text-[24px] text-[var(--green)] tabular-nums">$12.50</div>
        </div>
      </motion.div>

      {/* Deposit */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        <CreditWalletDeposit />
      </motion.div>

      {/* Transaction history */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] mb-3 border-b border-[var(--border)] pb-2">
          transaction history
        </div>
        <div className="border border-[var(--border)] font-mono text-[12px]">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--muted)]">
                <th className="text-left px-3 py-2 font-normal">type</th>
                <th className="text-right px-3 py-2 font-normal">amount</th>
                <th className="text-left px-3 py-2 font-normal">method</th>
                <th className="text-left px-3 py-2 font-normal">date</th>
              </tr>
            </thead>
            <tbody>
              {MOCK_TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-2 text-[var(--muted)]">{tx.type}</td>
                  <td
                    className="px-3 py-2 text-right"
                    style={{ color: tx.type === 'deposit' ? 'var(--green)' : 'var(--white)' }}
                  >
                    {tx.amount}
                  </td>
                  <td className="px-3 py-2 text-[var(--muted)]">{tx.method}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Stripe portal */}
      <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
        <div className="text-[var(--muted)] mb-2">stripe billing portal</div>
        <button className="border border-[var(--blue)] text-[var(--blue)] px-3 py-1.5 hover:bg-[var(--blue)] hover:text-white transition-all duration-150">
          [open stripe portal →]
        </button>
      </div>
    </div>
  )
}

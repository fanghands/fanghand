'use client'

import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { CreditWalletDeposit } from '@/components/payments/CreditWalletDeposit'
import { getCreditBalance, getPaymentHistory } from '@/lib/api/payments'

export default function BillingPage() {
  const { data: balance } = useQuery({
    queryKey: ['credit-balance'],
    queryFn: getCreditBalance,
  })

  const { data: history } = useQuery({
    queryKey: ['payment-history'],
    queryFn: () => getPaymentHistory(),
  })

  const transactions = (history as any)?.data ?? []
  const balanceUsd = balance ? (balance.lamports / 1e9 * 150).toFixed(2) : '0.00'

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        billing
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono">
          <div className="text-[10px] text-[var(--muted)] uppercase tracking-wider mb-1">
            credit wallet balance
          </div>
          <div className="text-[24px] text-[var(--green)] tabular-nums">${balanceUsd}</div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        <CreditWalletDeposit />
      </motion.div>

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
                <th className="text-left px-3 py-2 font-normal">currency</th>
                <th className="text-left px-3 py-2 font-normal">date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
                <tr><td colSpan={4} className="px-3 py-4 text-[var(--muted)] text-center">no transactions yet</td></tr>
              )}
              {transactions.map((tx: any) => (
                <tr key={tx.id} className="border-b border-[var(--border)]">
                  <td className="px-3 py-2 text-[var(--muted)]">{tx.type}</td>
                  <td
                    className="px-3 py-2 text-right"
                    style={{ color: tx.type === 'refund' ? 'var(--green)' : 'var(--white)' }}
                  >
                    {tx.amount_cents ? `$${(tx.amount_cents / 100).toFixed(2)}` : `${tx.amount_lamports} lam`}
                  </td>
                  <td className="px-3 py-2 text-[var(--muted)]">{tx.currency}</td>
                  <td className="px-3 py-2 text-[var(--muted)]">{new Date(tx.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
        <div className="text-[var(--muted)] mb-2">stripe billing portal</div>
        <button className="border border-[var(--blue)] text-[var(--blue)] px-3 py-1.5 hover:bg-[var(--blue)] hover:text-white transition-all duration-150">
          [open stripe portal →]
        </button>
      </div>
    </div>
  )
}

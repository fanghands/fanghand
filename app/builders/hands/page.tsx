'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ReviewStatusCard } from '@/components/builders/ReviewStatusCard'

const MOCK_HANDS = [
  { id: 'bh-1', name: 'alpha-scanner', status: 'approved' as const, activations: 34, earnings: '$245.00' },
  { id: 'bh-2', name: 'tweet-composer', status: 'approved' as const, activations: 52, earnings: '$380.50' },
  { id: 'bh-3', name: 'portfolio-tracker', status: 'pending' as const, activations: 0, earnings: '$0.00' },
  { id: 'bh-4', name: 'sentiment-bot', status: 'rejected' as const, activations: 0, earnings: '$0.00', reason: 'insufficient documentation' },
]

export default function BuilderHandsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px] flex-1">
          my submitted hands
        </div>
        <Link
          href="/builders/hands/new"
          className="border border-[var(--green)] text-[var(--green)] px-3 py-1 text-[12px] hover:bg-[var(--green)] hover:text-black transition-all duration-150 ml-3"
        >
          [+ submit new]
        </Link>
      </div>
      {MOCK_HANDS.map((hand, i) => (
        <motion.div
          key={hand.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          viewport={{ once: true }}
          className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]"
        >
          <div className="flex items-start justify-between mb-3">
            <span className="text-[var(--white)] text-[14px]">{hand.name}</span>
            <ReviewStatusCard status={hand.status} reason={hand.reason} />
          </div>
          <div className="flex items-center gap-6 text-[var(--muted)] mb-3">
            <span>activations: {hand.activations}</span>
            <span>earnings: {hand.earnings}</span>
          </div>
          <div className="flex gap-2">
            <button className="border border-[var(--border)] text-[var(--muted)] px-3 py-1 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150">
              [edit]
            </button>
            <button className="border border-[var(--border)] text-[var(--muted)] px-3 py-1 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150">
              [manage]
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

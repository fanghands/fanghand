'use client'

import { motion } from 'framer-motion'
import type { Hand } from '@/lib/marketplace-data'

interface HandCardProps {
  hand: Hand
  index: number
  onViewToml: (hand: Hand) => void
}

function renderRating(rating: number): string {
  if (rating === 0) return '░░░░░░░░░░ —'
  const filled = Math.round(rating * 2)
  const empty = 10 - filled
  return '█'.repeat(filled) + '░'.repeat(empty) + ' ' + rating.toFixed(1)
}

export function HandCard({ hand, index, onViewToml }: HandCardProps) {
  const isOfficial = hand.badge === 'OFFICIAL'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-active)] transition-colors duration-200 flex flex-col"
    >
      {/* badge */}
      <div className="px-5 pt-4 pb-2">
        <span
          className={`text-[10px] px-2 py-0.5 border ${
            isOfficial
              ? 'border-[var(--green)] text-[var(--green)]'
              : 'border-[var(--muted-2)] text-[var(--muted)]'
          }`}
        >
          {hand.badge}
        </span>
        {hand.pending && (
          <span className="text-[10px] px-2 py-0.5 border border-[var(--amber)] text-[var(--amber)] ml-2">
            PENDING
          </span>
        )}
      </div>

      {/* name + description */}
      <div className="px-5 pb-3">
        <div className="text-[var(--white)] text-[15px] font-medium mb-1">{hand.name}</div>
        <div className="text-[12px] text-[var(--muted)] leading-relaxed">{hand.description}</div>
      </div>

      {/* features */}
      <div className="px-5 pb-3 flex-1">
        {hand.features.map((feat) => (
          <div key={feat} className="text-[12px] text-[var(--muted)] leading-6">
            <span className="text-[var(--green)] mr-1.5">·</span>
            {feat}
          </div>
        ))}
      </div>

      {/* meta */}
      <div className="px-5 pb-3 border-t border-[var(--border)] pt-3">
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[var(--muted)]">
          <span>author: {hand.author}</span>
          <span>installs: {hand.installs > 0 ? hand.installs : '—'}</span>
        </div>
        <div className="text-[11px] text-[var(--muted)] mt-1 font-mono">
          rating: <span className="text-[var(--green)]">{renderRating(hand.rating)}</span>
        </div>
      </div>

      {/* price */}
      <div className="px-5 pb-3">
        <div className="text-[12px]">
          <span className="text-[var(--muted)]">price: </span>
          <span className={hand.price === 'free' ? 'text-[var(--green)]' : 'text-[var(--amber)]'}>
            {hand.price}
          </span>
        </div>
      </div>

      {/* actions */}
      <div className="px-5 pb-4 flex gap-3 mt-auto">
        <button
          onClick={() => onViewToml(hand)}
          className="px-3 py-1.5 text-[12px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
        >
          [view HAND.toml]
        </button>
        <span className="px-3 py-1.5 text-[12px] border border-[var(--muted-2)] text-[var(--muted)] cursor-not-allowed">
          [coming soon]
        </span>
      </div>
    </motion.div>
  )
}

'use client'

import { motion } from 'framer-motion'

interface VoteCardProps {
  id: string
  title: string
  voteCount: number
  totalVotes: number
  hasVoted: boolean
  onVote: () => void
}

export function VoteCard({ id, title, voteCount, totalVotes, hasVoted, onVote }: VoteCardProps) {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--border-active)] transition-colors duration-200">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="text-[11px] text-[var(--muted)] mb-1">[FINDING #{id}]</div>
          <div className="text-[var(--white)] text-sm">{title}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-[var(--green)] text-lg font-medium">{voteCount.toLocaleString()}</div>
          <div className="text-[11px] text-[var(--muted)]">votes</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[11px] text-[var(--muted)] mb-1.5">
          <span>vote weight</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-1 bg-[var(--muted-2)] w-full">
          <motion.div
            className="h-full bg-[var(--green)]"
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <button
        onClick={onVote}
        disabled={hasVoted}
        className={`w-full py-2 px-4 text-[13px] border transition-colors duration-150 cursor-pointer ${
          hasVoted
            ? 'border-[var(--muted-2)] text-[var(--muted)] cursor-not-allowed'
            : 'border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black'
        }`}
      >
        {hasVoted ? '[voted ✓]' : '[cast vote]'}
      </button>
    </div>
  )
}

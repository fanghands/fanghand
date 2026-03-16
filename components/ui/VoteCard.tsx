'use client'

import { motion } from 'framer-motion'

interface VoteCardProps {
  id: string
  title: string
  voteCount: number
  totalVotes: number
  hasVoted: boolean
  accentColor?: string
  onVote: () => void
}

export function VoteCard({
  id,
  title,
  voteCount,
  totalVotes,
  hasVoted,
  accentColor = 'var(--green)',
  onVote,
}: VoteCardProps) {
  const percentage = totalVotes > 0 ? Math.round((voteCount / totalVotes) * 100) : 0

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--border-active)] transition-colors duration-200">
      <div className="flex items-start justify-between mb-4 gap-4">
        <div>
          <div className="text-[11px] text-[var(--muted)] mb-1">[FINDING #{id}]</div>
          <div className="text-[var(--white)] text-sm">{title}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-medium" style={{ color: accentColor }}>
            {voteCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-[var(--muted)]">votes</div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-[11px] text-[var(--muted)] mb-1.5">
          <span>vote weight</span>
          <span>{percentage}%</span>
        </div>
        <div className="h-1.5 bg-[var(--muted-2)] w-full rounded-full overflow-hidden">
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: accentColor }}
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <button
        onClick={onVote}
        disabled={hasVoted}
        className="w-full py-2 px-4 text-[13px] border transition-colors duration-150 cursor-pointer"
        style={
          hasVoted
            ? { borderColor: 'var(--muted-2)', color: 'var(--muted)', cursor: 'not-allowed' }
            : { borderColor: accentColor, color: accentColor }
        }
        onMouseEnter={(e) => {
          if (!hasVoted) {
            e.currentTarget.style.backgroundColor = accentColor
            e.currentTarget.style.color = 'black'
          }
        }}
        onMouseLeave={(e) => {
          if (!hasVoted) {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = accentColor
          }
        }}
      >
        {hasVoted ? '[voted]' : '[cast vote]'}
      </button>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FINDINGS } from '@/lib/constants'
import { VoteCard } from '@/components/ui/VoteCard'

const INITIAL_VOTES = [847, 623, 412]
const STORAGE_KEY = 'fanghand_voted'

export function VoteSection() {
  const [votes, setVotes] = useState(INITIAL_VOTES)
  const [votedIndex, setVotedIndex] = useState<number | null>(null)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored !== null) {
        const parsed = JSON.parse(stored)
        if (typeof parsed.index === 'number') {
          setVotedIndex(parsed.index)
        }
        if (Array.isArray(parsed.votes)) {
          setVotes(parsed.votes)
        }
      }
    } catch {
      // ignore
    }
  }, [])

  const handleVote = (index: number) => {
    if (votedIndex !== null) return
    const next = votes.map((v, i) => (i === index ? v + 1 : v))
    setVotes(next)
    setVotedIndex(index)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ index, votes: next }))
    } catch {
      // ignore
    }
  }

  const totalVotes = votes.reduce((a, b) => a + b, 0)

  return (
    <section id="vote" className="px-4 py-20 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">community.vote()</div>
        <p className="text-[12px] text-[var(--muted)] mb-8">
          you pick the mission. agents execute on monday.
        </p>

        <div className="flex flex-col gap-4 mb-8">
          {FINDINGS.map((finding, i) => (
            <VoteCard
              key={finding.id}
              id={finding.id}
              title={finding.title}
              voteCount={votes[i]}
              totalVotes={totalVotes}
              hasVoted={votedIndex !== null}
              onVote={() => handleVote(i)}
            />
          ))}
        </div>

        {/* schedule */}
        <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
          <div className="flex flex-col gap-2 text-[12px]">
            {[
              ['voting opens', 'every friday, 00:00 UTC'],
              ['voting closes', 'saturday, 23:59 UTC'],
              ['result announced', 'sunday by analyst-hand on @fanghandx'],
              ['execution starts', 'monday'],
            ].map(([label, value]) => (
              <div key={label} className="flex flex-col sm:flex-row sm:items-center gap-x-4">
                <span className="text-[var(--muted)] w-36 shrink-0">{label}:</span>
                <span className="text-[var(--white)]">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}

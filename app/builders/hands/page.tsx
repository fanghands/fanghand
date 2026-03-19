'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { ReviewStatusCard } from '@/components/builders/ReviewStatusCard'
import { getBuilderHands } from '@/lib/api/builders'

export default function BuilderHandsPage() {
  const { data } = useQuery({
    queryKey: ['builder-hands'],
    queryFn: getBuilderHands as () => Promise<{
      data: Array<{
        id: string; name: string; status: string;
        total_activations: number; slug: string;
      }>
    }>,
  })

  const hands = (data?.data ?? []).map((h: any) => ({
    id: h.id,
    name: h.name,
    status: h.status === 'live' ? 'approved' : h.status === 'review' ? 'pending' : h.status,
    activations: h.total_activations || 0,
    earnings: '—',
  }))

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
      {hands.length === 0 && (
        <div className="text-[var(--muted)] text-[12px] font-mono">no submitted hands yet.</div>
      )}
      {hands.map((hand: any, i: number) => (
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
            <ReviewStatusCard status={hand.status} />
          </div>
          <div className="flex items-center gap-6 text-[var(--muted)] mb-3">
            <span>activations: {hand.activations}</span>
            <span>earnings: {hand.earnings}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

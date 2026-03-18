'use client'

import { useState } from 'react'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchHandBySlug, fetchHandReviews } from '@/lib/api/hands'
import { HandDetail } from '@/components/marketplace/HandDetail'
import { HandActivateModal } from '@/components/marketplace/HandActivateModal'
import { LoadingSpinner } from '@/components/common/LoadingSpinner'
import type { Hand } from '@/types/hand'
import Link from 'next/link'

export function HandDetailPageContent() {
  const params = useParams()
  const slug = params.slug as string

  const [activateHand, setActivateHand] = useState<Hand | null>(null)

  const { data: hand, isLoading: handLoading } = useQuery({
    queryKey: ['hand', slug],
    queryFn: () => fetchHandBySlug(slug),
    enabled: !!slug,
  })

  const { data: reviews } = useQuery({
    queryKey: ['hand-reviews', slug],
    queryFn: () => fetchHandReviews(slug),
    enabled: !!slug,
  })

  if (handLoading) {
    return (
      <main className="px-4 py-20 max-w-6xl mx-auto">
        <LoadingSpinner text="loading hand details..." />
      </main>
    )
  }

  if (!hand) {
    return (
      <main className="px-4 py-20 max-w-6xl mx-auto text-center">
        <div className="text-[var(--muted)] text-[14px] font-mono mb-4">
          hand not found.
        </div>
        <Link
          href="/marketplace"
          className="text-[var(--green)] text-[12px] hover:text-[var(--white)] transition-colors duration-150"
        >
          [back to marketplace]
        </Link>
      </main>
    )
  }

  return (
    <main className="pb-14">
      {/* header bar */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full flex items-center justify-between text-[12px] border-b border-[var(--border)]">
        <span className="flex items-center gap-2 text-[var(--muted)]">
          <img src="/fanghand_icon_128.png" alt="FangHand" className="w-4 h-4" />
          marketplace.fanghand.xyz
        </span>
        <div className="flex items-center gap-4">
          <Link
            href="/marketplace"
            className="text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-150"
          >
            [back to marketplace]
          </Link>
          <button
            className="px-3 py-1.5 text-[12px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-crosshair"
          >
            [connect wallet]
          </button>
        </div>
      </div>

      {/* breadcrumb */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="text-[11px] text-[var(--muted)]"
        >
          <Link href="/marketplace" className="hover:text-[var(--white)] transition-colors duration-150">
            marketplace
          </Link>
          <span className="mx-2">/</span>
          <span className="text-[var(--white)]">{hand.name}</span>
        </motion.div>
      </div>

      {/* detail */}
      <section className="px-4 py-6 max-w-6xl mx-auto w-full">
        <HandDetail
          hand={hand}
          reviews={reviews ?? []}
          onActivate={() => setActivateHand(hand)}
        />
      </section>

      {/* activate modal */}
      <HandActivateModal hand={activateHand} onClose={() => setActivateHand(null)} />
    </main>
  )
}

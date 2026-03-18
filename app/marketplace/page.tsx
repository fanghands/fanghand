'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { useQuery } from '@tanstack/react-query'
import { fetchHands } from '@/lib/api/hands'
import { HandFilters } from '@/components/marketplace/HandFilters'
import { HandGrid } from '@/components/marketplace/HandGrid'
import { HandCard } from '@/components/marketplace/HandCard'
import { TomlModal } from '@/components/marketplace/TomlModal'
import { BuildCTA } from '@/components/marketplace/BuildCTA'
import { HandActivateModal } from '@/components/marketplace/HandActivateModal'
import { EmptyState } from '@/components/common/EmptyState'
import type { Hand as NewHand } from '@/types/hand'
import type { Hand as LegacyHand } from '@/lib/marketplace-data'

// Map new Hand type to legacy HandCard format
function toLegacyHand(h: NewHand): LegacyHand {
  return {
    id: h.id,
    name: h.name,
    badge: h.badge,
    category: h.category,
    description: h.description,
    features: h.features,
    author: h.author,
    installs: h.activations,
    rating: h.rating,
    price: h.price_monthly_cents === null ? 'free' : `$${(h.price_monthly_cents / 100).toFixed(2)}/mo`,
    toml_preview: h.toml_preview,
    active: h.status === 'active',
    pending: h.status === 'pending',
  }
}

function MarketplaceContent() {
  const searchParams = useSearchParams()
  const filter = searchParams.get('filter') || 'all'

  const [tomlHand, setTomlHand] = useState<LegacyHand | null>(null)
  const [activateHand, setActivateHand] = useState<NewHand | null>(null)

  const { data, isLoading } = useQuery({
    queryKey: ['hands', filter],
    queryFn: () => fetchHands({ category: filter }),
  })

  const hands = data?.data ?? []

  const totalActivations = useMemo(
    () => hands.reduce((sum, h) => sum + h.activations, 0),
    [hands]
  )
  const activeCount = useMemo(
    () => hands.filter((h) => h.status === 'active').length,
    [hands]
  )

  const handleViewToml = (legacy: LegacyHand) => {
    setTomlHand(legacy)
  }

  const handleActivate = (hand: NewHand) => {
    setActivateHand(hand)
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
          <a
            href="/"
            className="text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-150"
          >
            [home]
          </a>
          <button
            className="px-3 py-1.5 text-[12px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-crosshair"
          >
            [connect wallet]
          </button>
        </div>
      </div>

      {/* hero */}
      <section className="px-4 py-12 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-[28px] md:text-[36px] text-[var(--white)] font-medium mb-3">
            fanghand marketplace
          </h1>
          <p className="text-[var(--muted)] text-[14px] mb-8 max-w-xl">
            browse and activate autonomous AI hands. each hand runs on OpenFang infrastructure.
            builders earn $FGH on every activation.
          </p>

          {/* stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex gap-6 text-[12px]"
          >
            <div>
              <span className="text-[var(--muted)]">total hands: </span>
              <span className="text-[var(--white)] tabular-nums">{hands.length}</span>
            </div>
            <div>
              <span className="text-[var(--muted)]">active: </span>
              <span className="text-[var(--green)] tabular-nums">{activeCount}</span>
            </div>
            <div>
              <span className="text-[var(--muted)]">activations: </span>
              <span className="text-[var(--white)] tabular-nums">{totalActivations.toLocaleString()}</span>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* filters */}
      <div className="px-4 max-w-6xl mx-auto w-full">
        <HandFilters />
      </div>

      {/* grid */}
      <section className="px-4 py-8 max-w-6xl mx-auto w-full">
        <HandGrid loading={isLoading}>
          {hands.map((hand, i) => (
            <div key={hand.id} className="relative">
              <HandCard
                hand={toLegacyHand(hand)}
                index={i}
                onViewToml={handleViewToml}
              />
              {/* activate overlay button */}
              <div className="absolute bottom-4 right-5">
                <button
                  onClick={() => handleActivate(hand)}
                  disabled={hand.status === 'pending'}
                  className={`px-3 py-1.5 text-[12px] border transition-colors duration-150 cursor-crosshair ${
                    hand.status === 'pending'
                      ? 'border-[var(--muted-2)] text-[var(--muted)] cursor-not-allowed'
                      : 'border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)]'
                  }`}
                >
                  {hand.status === 'pending' ? '[coming soon]' : '[activate]'}
                </button>
              </div>
            </div>
          ))}
        </HandGrid>

        {!isLoading && hands.length === 0 && (
          <EmptyState message="no hands match this filter." />
        )}
      </section>

      <div className="border-t border-[var(--border)]" />
      <BuildCTA />

      {/* modals */}
      <TomlModal hand={tomlHand} onClose={() => setTomlHand(null)} />
      <HandActivateModal hand={activateHand} onClose={() => setActivateHand(null)} />
    </main>
  )
}

export default function MarketplacePage() {
  return (
    <Suspense fallback={
      <div className="px-4 py-20 max-w-6xl mx-auto text-center">
        <div className="text-[var(--muted)] text-[13px] font-mono">loading marketplace...</div>
      </div>
    }>
      <MarketplaceContent />
    </Suspense>
  )
}

'use client'

import { useState } from 'react'
import { HANDS, type FilterOption, type Hand } from '@/lib/marketplace-data'
import { MarketplaceHero } from '@/components/marketplace/MarketplaceHero'
import { FilterBar } from '@/components/marketplace/FilterBar'
import { RevenueBanner } from '@/components/marketplace/RevenueBanner'
import { HandCard } from '@/components/marketplace/HandCard'
import { TomlModal } from '@/components/marketplace/TomlModal'
import { BuildCTA } from '@/components/marketplace/BuildCTA'

export default function MarketplacePage() {
  const [filter, setFilter] = useState<FilterOption>('all')
  const [tomlHand, setTomlHand] = useState<Hand | null>(null)

  const filtered = HANDS.filter((hand) => {
    if (filter === 'all') return true
    if (filter === 'official') return hand.badge === 'OFFICIAL'
    if (filter === 'community') return hand.badge === 'COMMUNITY'
    if (filter === 'free') return hand.price === 'free'
    return hand.category.includes(filter)
  })

  return (
    <main className="pb-14">
      {/* header bar */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full flex items-center justify-between text-[12px] border-b border-[var(--border)]">
        <span className="text-[var(--muted)]">marketplace.fanghand.xyz</span>
        <a
          href="/"
          className="text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-150"
        >
          [← back to fanghand.xyz]
        </a>
      </div>

      <MarketplaceHero />

      <FilterBar active={filter} onChange={setFilter} />

      <div className="my-4">
        <RevenueBanner />
      </div>

      {/* hand cards grid */}
      <section className="px-4 py-8 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((hand, i) => (
            <HandCard
              key={hand.id}
              hand={hand}
              index={i}
              onViewToml={setTomlHand}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)] text-[13px]">
            no hands match this filter.
          </div>
        )}
      </section>

      <div className="border-t border-[var(--border)]" />
      <BuildCTA />

      {/* TOML modal */}
      <TomlModal hand={tomlHand} onClose={() => setTomlHand(null)} />
    </main>
  )
}

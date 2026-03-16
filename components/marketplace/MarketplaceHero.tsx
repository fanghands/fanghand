'use client'

import { motion } from 'framer-motion'
import { HANDS } from '@/lib/marketplace-data'

export function MarketplaceHero() {
  const totalActivations = HANDS.reduce((sum, h) => sum + h.installs, 0)
  const totalHands = HANDS.length

  return (
    <section className="px-4 pt-16 pb-12 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-[clamp(28px,5vw,48px)] font-medium text-[var(--white)] tracking-tight leading-none mb-3">
          fanghand marketplace
        </h1>
        <p className="text-[var(--muted)] text-[14px] mb-8 max-w-lg">
          autonomous Hands built on OpenFang. activate one. it works while you sleep.
        </p>

        <div className="flex flex-wrap gap-3 text-[12px]">
          <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
            {totalHands} hands available
          </span>
          <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
            {totalActivations.toLocaleString()} total activations
          </span>
          <span className="border border-[var(--green)] px-3 py-1.5 text-[var(--green)]">
            $FGH revenue share: active
          </span>
        </div>
      </motion.div>
    </section>
  )
}

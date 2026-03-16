'use client'

import { motion } from 'framer-motion'
import { HANDS } from '@/lib/marketplace-data'

const PREVIEW_HANDS = HANDS.filter((h) => h.badge === 'OFFICIAL' && h.active).slice(0, 3)

export function MarketplacePreview() {
  const totalHands = HANDS.length
  const totalActivations = HANDS.reduce((sum, h) => sum + h.installs, 0)

  return (
    <section className="px-4 py-20 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">marketplace.preview() — coming soon</div>
        <p className="text-[12px] text-[var(--muted)] mb-6">
          autonomous Hands built on OpenFang. the marketplace is under construction.
        </p>

        {/* stats */}
        <div className="flex flex-wrap gap-3 mb-8 text-[12px]">
          <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
            {totalHands} hands
          </span>
          <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
            {totalActivations.toLocaleString()} activations
          </span>
          <span className="border border-[var(--amber)] px-3 py-1.5 text-[var(--amber)]">
            status: coming soon
          </span>
        </div>

        {/* preview cards — compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {PREVIEW_HANDS.map((hand, i) => (
            <motion.div
              key={hand.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.08 }}
              className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--border-active)] transition-colors duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] px-1.5 py-0.5 border border-[var(--green)] text-[var(--green)]">
                  OFFICIAL
                </span>
              </div>
              <div className="text-[var(--white)] text-[14px] font-medium mb-1">{hand.name}</div>
              <div className="text-[12px] text-[var(--muted)] leading-relaxed mb-3 line-clamp-2">
                {hand.description}
              </div>
              <div className="flex items-center justify-between text-[11px] text-[var(--muted)]">
                <span>{hand.installs} installs</span>
                <span className="text-[var(--green)]">{hand.price}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA to marketplace */}
        <a
          href="/marketplace"
          className="inline-block px-5 py-2.5 text-[13px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
        >
          [preview marketplace →]
        </a>
      </motion.div>
    </section>
  )
}

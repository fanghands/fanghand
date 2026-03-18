'use client'

import { motion } from 'framer-motion'
import { formatPrice } from '@/lib/utils/formatters'

interface HandPricingCardProps {
  priceMonthly: number | null
  pricePerRun: number | null
}

export function HandPricingCard({ priceMonthly, pricePerRun }: HandPricingCardProps) {
  const isFree = priceMonthly === null && pricePerRun === null

  if (isFree) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="border border-[var(--green)] bg-[var(--surface)] p-6"
      >
        <div className="text-[var(--green)] text-[18px] font-medium mb-2">free</div>
        <div className="text-[var(--muted)] text-[12px]">
          this hand is free to activate and run. no subscription required.
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      {/* monthly */}
      <div className="border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-active)] transition-colors duration-150">
        <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">monthly subscription</div>
        <div className="text-[var(--white)] text-[24px] font-medium mb-1">
          {formatPrice(priceMonthly)}
          <span className="text-[var(--muted)] text-[12px]">/month</span>
        </div>
        <div className="text-[var(--muted)] text-[12px] mt-3 space-y-1">
          <div><span className="text-[var(--green)] mr-1">+</span>unlimited runs</div>
          <div><span className="text-[var(--green)] mr-1">+</span>priority scheduling</div>
          <div><span className="text-[var(--green)] mr-1">+</span>cancel anytime</div>
        </div>
        <div className="mt-4 px-2 py-1 border border-[var(--amber)] text-[var(--amber)] text-[10px] inline-block">
          pay with $FGH for 20% discount
        </div>
      </div>

      {/* per run */}
      <div className="border border-[var(--border)] bg-[var(--surface)] p-6 hover:border-[var(--border-active)] transition-colors duration-150">
        <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">pay per run</div>
        <div className="text-[var(--white)] text-[24px] font-medium mb-1">
          {formatPrice(pricePerRun)}
          <span className="text-[var(--muted)] text-[12px]">/run</span>
        </div>
        <div className="text-[var(--muted)] text-[12px] mt-3 space-y-1">
          <div><span className="text-[var(--green)] mr-1">+</span>pay only when used</div>
          <div><span className="text-[var(--green)] mr-1">+</span>no commitment</div>
          <div><span className="text-[var(--green)] mr-1">+</span>credit wallet support</div>
        </div>
      </div>
    </motion.div>
  )
}

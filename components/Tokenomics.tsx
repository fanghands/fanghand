'use client'

import { motion } from 'framer-motion'
import { TOKENOMICS_STEPS, BURN_TX_FULL, BURN_TX_SHORT } from '@/lib/constants'
import { CopyAddress } from '@/components/ui/CopyAddress'

const STEP_COLORS = [
  'var(--blue)',
  'var(--purple)',
  'var(--cyan)',
  'var(--red)',
  'var(--amber)',
  'var(--green)',
]

export function Tokenomics() {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">tokenomics.log</div>

        {/* vertical flow */}
        <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-6 mb-6">
          <div className="flex flex-col items-center gap-0">
            {TOKENOMICS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.15 }}
                className="flex flex-col items-center"
              >
                <div
                  className="border px-4 py-2 text-[13px] text-center max-w-xs w-full transition-colors duration-200"
                  style={{
                    borderColor: STEP_COLORS[i],
                    color: STEP_COLORS[i],
                    backgroundColor: `${STEP_COLORS[i]}10`,
                  }}
                >
                  {step}
                </div>
                {i < TOKENOMICS_STEPS.length - 1 && (
                  <div className="flex flex-col items-center py-1" style={{ color: STEP_COLORS[i] }}>
                    <span className="text-[11px] leading-none">|</span>
                    <span className="text-[11px] leading-none">v</span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* key facts */}
        <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
          <div className="flex flex-col gap-3 text-[13px]">
            <div className="flex items-center gap-2">
              <span className="text-[var(--green)]">✓</span>
              <span className="text-[var(--white)]">first burn: already on-chain</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[var(--muted)]">burn tx:</span>
              <CopyAddress value={BURN_TX_FULL} display={BURN_TX_SHORT} />
            </div>
            <div className="border-t border-[var(--border)] pt-3 text-[12px] text-[var(--muted)]">
              this is not a whitepaper. it is a deployed transaction.
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

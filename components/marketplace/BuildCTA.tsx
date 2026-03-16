'use client'

import { motion } from 'framer-motion'

export function BuildCTA() {
  return (
    <section className="px-4 py-20 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="border border-[var(--border)] bg-[var(--surface)] px-6 py-8"
      >
        <div className="text-[var(--white)] text-[18px] font-medium mb-4">
          want to publish a Hand?
        </div>
        <div className="text-[13px] text-[var(--muted)] leading-7 mb-6">
          define your HAND.toml.
          <br />
          deploy on OpenFang.
          <br />
          earn $FGH on every activation.
        </div>
        <div className="flex flex-col gap-2">
          <a
            href="https://github.com/RightNow-AI/openfang"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--green)] hover:text-[var(--white)] transition-colors duration-150"
          >
            → read the OpenFang Hand development guide
          </a>
          <a
            href="https://twitter.com/openfangg"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[var(--green)] hover:text-[var(--white)] transition-colors duration-150"
          >
            → join @openfangg to get listed
          </a>
        </div>
      </motion.div>
    </section>
  )
}

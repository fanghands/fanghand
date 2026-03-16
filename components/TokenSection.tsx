'use client'

import { motion } from 'framer-motion'
import { TOKEN_DATA } from '@/lib/constants'
import { CopyAddress } from '@/components/ui/CopyAddress'

export function TokenSection() {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">$FGH — token facts</div>

        <div className="border border-[var(--border)]">
          {TOKEN_DATA.map((row, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center border-b border-[var(--border)] last:border-b-0 px-4 py-3 hover:bg-[var(--surface)] transition-colors duration-150"
            >
              <span className="text-[var(--muted)] text-[12px] w-full sm:w-36 shrink-0 mb-1 sm:mb-0">
                {row.field}
              </span>
              <span
                className={`text-[13px] break-all ${
                  'highlight' in row && row.highlight
                    ? 'text-[var(--green)]'
                    : 'text-[var(--white)]'
                }`}
              >
                {'copyable' in row && row.copyable ? (
                  <CopyAddress
                    value={'fullValue' in row && row.fullValue ? row.fullValue : row.value}
                    display={row.value}
                  />
                ) : 'link' in row && row.link ? (
                  <a
                    href={row.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--white)] hover:text-[var(--green)] underline underline-offset-2 transition-colors duration-150"
                  >
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </span>
            </div>
          ))}
        </div>

        {/* note block */}
        <div className="mt-4 border border-[var(--border)] bg-[var(--surface)] px-4 py-3">
          <p className="text-[12px] text-[var(--muted)] leading-relaxed">
            buybacks are not a promise. they are a mechanism. agents earn → treasury fills → tokens
            burn on-chain. the first burn is already executed.
          </p>
        </div>
      </motion.div>
    </section>
  )
}

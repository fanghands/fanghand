'use client'

import { motion } from 'framer-motion'
import { FINDINGS } from '@/lib/constants'

export function Findings() {
  return (
    <section className="px-4 py-20 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">agent_report_[week_01].log</div>
        <p className="text-[12px] text-[var(--muted)] mb-8">
          21 days. 8,400+ sources. 3 high-confidence opportunities identified.
        </p>

        <div className="flex flex-col gap-5">
          {FINDINGS.map((finding, i) => (
            <motion.div
              key={finding.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="border border-[var(--border)] bg-[var(--surface)] hover:border-[var(--border-active)] transition-colors duration-200"
            >
              {/* header */}
              <div className="px-5 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] text-[var(--muted)]">[FINDING #{finding.id}]</span>
                <div className="flex items-center gap-3">
                  <span className="text-[11px] text-[var(--muted)]">
                    sources: {finding.sources}
                  </span>
                  <span
                    className={`text-[11px] font-medium ${
                      finding.statusColor === 'green'
                        ? 'text-[var(--green)]'
                        : 'text-[var(--muted)]'
                    }`}
                  >
                    {finding.status} [{finding.confidence}%]
                  </span>
                </div>
              </div>

              {/* body */}
              <div className="px-5 py-4">
                <div className="text-[var(--white)] text-[14px] font-medium mb-1">
                  {finding.title}
                </div>
                <div className="text-[12px] text-[var(--muted)] mb-4">
                  potential: {finding.potential}
                </div>

                <div className="border-t border-[var(--border)] pt-4 mb-4">
                  <p className="text-[13px] text-[var(--muted)] leading-relaxed mb-3">
                    {finding.description}
                  </p>
                  {finding.why && (
                    <p className="text-[12px] text-[var(--muted)] leading-relaxed border-l-2 border-[var(--border)] pl-3">
                      {finding.why}
                    </p>
                  )}
                </div>

                <div className="border-t border-[var(--border)] pt-4">
                  <a
                    href="#vote"
                    className={`text-[12px] border px-3 py-1.5 transition-colors duration-150 cursor-pointer ${
                      finding.statusColor === 'green'
                        ? 'border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black'
                        : 'border-[var(--muted)] text-[var(--muted)] hover:border-[var(--white)] hover:text-[var(--white)]'
                    }`}
                  >
                    [VOTE FOR THIS →]
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

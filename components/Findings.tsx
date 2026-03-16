'use client'

import { motion } from 'framer-motion'
import { FINDINGS } from '@/lib/constants'

const CARD_COLORS = [
  { accent: 'var(--green)', dim: 'var(--green-dim)' },
  { accent: 'var(--blue)', dim: 'var(--blue-dim)' },
  { accent: 'var(--amber)', dim: 'var(--amber-dim)' },
]

export function Findings() {
  return (
    <section className="px-4 py-20 max-w-6xl mx-auto w-full">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FINDINGS.map((finding, i) => {
            const color = CARD_COLORS[i] || CARD_COLORS[0]
            return (
              <motion.div
                key={finding.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border bg-[var(--surface)] hover:border-[var(--border-active)] transition-colors duration-200 flex flex-col"
                style={{ borderColor: 'var(--border)' }}
              >
                {/* colored top accent bar */}
                <div className="h-1 w-full" style={{ backgroundColor: color.accent }} />

                {/* header */}
                <div className="px-5 py-3 border-b border-[var(--border)] flex flex-wrap items-center justify-between gap-2">
                  <span className="text-[11px]" style={{ color: color.accent }}>
                    [FINDING #{finding.id}]
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-[var(--muted)]">
                      sources: {finding.sources}
                    </span>
                    <span
                      className="text-[11px] font-medium"
                      style={{
                        color: finding.statusColor === 'green' ? color.accent : 'var(--muted)',
                      }}
                    >
                      {finding.status} [{finding.confidence}%]
                    </span>
                  </div>
                </div>

                {/* body */}
                <div className="px-5 py-4 flex flex-col flex-1">
                  <div className="text-[var(--white)] text-[14px] font-medium mb-1">
                    {finding.title}
                  </div>
                  <div className="text-[12px] mb-4" style={{ color: color.accent }}>
                    potential: {finding.potential}
                  </div>

                  <div className="border-t border-[var(--border)] pt-4 mb-4 flex-1">
                    <p className="text-[13px] text-[var(--muted)] leading-relaxed mb-3">
                      {finding.description}
                    </p>
                    {finding.why && (
                      <p
                        className="text-[12px] text-[var(--muted)] leading-relaxed pl-3"
                        style={{ borderLeft: `2px solid ${color.accent}` }}
                      >
                        {finding.why}
                      </p>
                    )}
                  </div>

                  <div className="border-t border-[var(--border)] pt-4 mt-auto">
                    <a
                      href="#vote"
                      className="text-[12px] border px-3 py-1.5 transition-colors duration-150 cursor-pointer inline-block"
                      style={{
                        borderColor: color.accent,
                        color: color.accent,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = color.accent
                        e.currentTarget.style.color = 'black'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent'
                        e.currentTarget.style.color = color.accent
                      }}
                    >
                      [VOTE FOR THIS]
                    </a>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}

'use client'

import { motion } from 'framer-motion'
import { AGENTS } from '@/lib/constants'

export function AgentStatus() {
  return (
    <section className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">agent.status()</div>

        {/* process table */}
        <div className="border border-[var(--border)]">
          <div className="flex items-center px-4 py-2 bg-[var(--surface-2)] border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
            <span className="w-10 shrink-0">PID</span>
            <span className="flex-1">PROCESS</span>
            <span className="w-20 shrink-0 text-right">STATUS</span>
          </div>

          {AGENTS.map((agent) => (
            <div
              key={agent.pid}
              className="flex items-center px-4 py-3 border-b border-[var(--border)] last:border-b-0 hover:bg-[var(--surface)] transition-colors duration-150"
            >
              <span className="w-10 shrink-0 text-[12px] text-[var(--muted)]">{agent.pid}</span>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span
                    className={`text-[13px] font-medium ${
                      agent.active ? 'text-[var(--white)]' : 'text-[var(--muted)]'
                    }`}
                  >
                    {agent.name}
                  </span>
                </div>
                <div className="text-[12px] text-[var(--muted)] mt-0.5">{agent.cycle}</div>

                {/* progress bar with color */}
                <div className="mt-2 h-1 w-full max-w-[160px] bg-[var(--muted-2)] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      backgroundColor: agent.active ? 'var(--green)' : 'var(--amber)',
                    }}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${agent.active ? agent.uptime : 10}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>

              <span
                className="w-20 shrink-0 text-right text-[12px] font-medium"
                style={{
                  color: agent.status === 'RUNNING' ? 'var(--green)' : 'var(--amber)',
                }}
              >
                {agent.status}
              </span>
            </div>
          ))}
        </div>

        {/* agent loop */}
        <div className="mt-6 border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
          <div className="text-[11px] text-[var(--cyan)] mb-3">agent loop</div>
          <pre className="text-[12px] text-[var(--muted)] leading-6 overflow-x-auto whitespace-pre">{`collector scans → researcher verifies → analyst synthesizes
      ↓
community votes (every friday, 48h)
      ↓
agents execute winning mission
      ↓
revenue → treasury → buyback → burn`}</pre>
        </div>
      </motion.div>
    </section>
  )
}

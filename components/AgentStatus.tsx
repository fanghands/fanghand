'use client'

import { motion } from 'framer-motion'
import { AGENTS } from '@/lib/constants'

export function AgentStatus() {
  return (
    <section className="px-4 py-20 max-w-2xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="section-title">agent.status()</div>

        {/* process table header */}
        <div className="border border-[var(--border)]">
          <div className="flex items-center px-4 py-2 bg-[var(--surface-2)] border-b border-[var(--border)] text-[11px] text-[var(--muted)]">
            <span className="w-10 shrink-0">PID</span>
            <span className="w-36 shrink-0 hidden sm:block">NAME</span>
            <span className="flex-1">PROCESS</span>
            <span className="w-20 shrink-0 hidden md:block text-right">STATUS</span>
            <span className="w-32 shrink-0 hidden lg:block text-right">UPTIME</span>
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
                  <span
                    className={`text-[11px] sm:hidden ${
                      agent.status === 'RUNNING'
                        ? 'text-[var(--green)]'
                        : 'text-[var(--muted)]'
                    }`}
                  >
                    {agent.status}
                  </span>
                </div>
                <div className="text-[12px] text-[var(--muted)] mt-0.5">{agent.cycle}</div>

                {/* progress bar */}
                <div className="mt-2 h-0.5 w-full max-w-[160px] bg-[var(--muted-2)]">
                  <motion.div
                    className={`h-full ${agent.active ? 'bg-[var(--green)]' : 'bg-[var(--muted-2)]'}`}
                    initial={{ width: 0 }}
                    whileInView={{ width: `${agent.uptime}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  />
                </div>
              </div>

              <span
                className={`w-20 shrink-0 hidden md:block text-right text-[12px] ${
                  agent.status === 'RUNNING'
                    ? 'text-[var(--green)]'
                    : 'text-[var(--muted)]'
                }`}
              >
                {agent.status}
              </span>

              <span className="w-32 shrink-0 hidden lg:block text-right text-[12px] text-[var(--muted)]">
                {agent.uptime > 0 ? `${agent.uptime}%` : '—'}
              </span>
            </div>
          ))}
        </div>

        {/* agent loop */}
        <div className="mt-8 border border-[var(--border)] bg-[var(--surface)] px-5 py-5">
          <div className="text-[11px] text-[var(--muted)] mb-3">agent loop</div>
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

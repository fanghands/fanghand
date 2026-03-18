'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { HandStatusBadge } from '@/components/dashboard/HandStatusBadge'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'
import { ApprovalQueue } from '@/components/dashboard/ApprovalQueue'

const MOCK_ACTIVATION = {
  id: 'act-1',
  name: 'alpha-scanner',
  status: 'active' as const,
  config: {
    model: 'claude-sonnet',
    cycle: 'every 4h',
    tools: ['web_search', 'api_call'],
    maxTokens: 4096,
  },
}

const MOCK_RUNS = [
  { id: 'r1', hand: 'alpha-scanner', status: 'completed' as const, tier: 'deep', cost: '$3.75', started: '12 min ago', duration: '4m 12s' },
  { id: 'r2', hand: 'alpha-scanner', status: 'completed' as const, tier: 'quick', cost: '$1.20', started: '4h ago', duration: '52s' },
  { id: 'r3', hand: 'alpha-scanner', status: 'failed' as const, tier: 'deep', cost: '$0.00', started: '8h ago', duration: '1m 3s' },
]

export function ActivationDetail() {
  const [status, setStatus] = useState<'active' | 'paused' | 'error' | 'expired'>(MOCK_ACTIVATION.status)

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-[var(--white)]">{MOCK_ACTIVATION.name}</span>
            <HandStatusBadge status={status} />
          </div>
          <div className="flex gap-2 text-[12px]">
            {status === 'active' ? (
              <button
                onClick={() => setStatus('paused')}
                className="border border-[var(--amber)] text-[var(--amber)] px-3 py-1 hover:bg-[var(--amber)] hover:text-black transition-all duration-150"
              >
                [pause]
              </button>
            ) : (
              <button
                onClick={() => setStatus('active')}
                className="border border-[var(--green)] text-[var(--green)] px-3 py-1 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [resume]
              </button>
            )}
            <button className="border border-[var(--red)] text-[var(--red)] px-3 py-1 hover:bg-[var(--red)] hover:text-black transition-all duration-150">
              [deactivate]
            </button>
          </div>
        </div>

        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] mb-6">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">configuration</div>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">model</span>
              <span>{MOCK_ACTIVATION.config.model}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">cycle</span>
              <span>{MOCK_ACTIVATION.config.cycle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">tools</span>
              <span>{MOCK_ACTIVATION.config.tools.join(', ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">max tokens</span>
              <span>{MOCK_ACTIVATION.config.maxTokens}</span>
            </div>
          </div>
        </div>

        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] mb-6">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">metrics</div>
          <div className="h-[120px] flex items-center justify-center text-[var(--muted-2)]">
            [chart area — metrics visualization]
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ApprovalQueue />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
      >
        <div className="text-[var(--muted)] text-[12px] border-b border-[var(--border)] pb-2 mb-3">
          recent runs
        </div>
        <RunHistoryTable runs={MOCK_RUNS} />
      </motion.div>
    </div>
  )
}

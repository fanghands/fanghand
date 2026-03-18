'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RunOutputViewer } from '@/components/dashboard/RunOutputViewer'
import { PaymentMethodSelector } from '@/components/payments/PaymentMethodSelector'

const HANDS = [
  { id: 'h1', name: 'alpha-scanner' },
  { id: 'h2', name: 'tweet-composer' },
  { id: 'h3', name: 'data-aggregator' },
]

const TIERS = [
  { id: 'quick', name: 'Quick', price: 120, desc: 'fast scan, basic output' },
  { id: 'deep', name: 'Deep', price: 375, desc: 'thorough analysis, detailed report' },
]

export default function NewRunPage() {
  const [step, setStep] = useState(1)
  const [selectedHand, setSelectedHand] = useState('')
  const [selectedTier, setSelectedTier] = useState('')
  const [config, setConfig] = useState('')
  const [paid, setPaid] = useState(false)

  const tier = TIERS.find((t) => t.id === selectedTier)

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        trigger new run
      </div>

      {/* Step 1: Select hand */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="text-[var(--muted)] text-[12px] mb-2">1. select hand</div>
        <select
          value={selectedHand}
          onChange={(e) => { setSelectedHand(e.target.value); if (step < 2) setStep(2) }}
          className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[12px] text-[var(--white)] font-mono focus:border-[var(--green)] focus:outline-none"
        >
          <option value="">— select —</option>
          {HANDS.map((h) => (
            <option key={h.id} value={h.id}>{h.name}</option>
          ))}
        </select>
      </motion.div>

      {/* Step 2: Select tier */}
      {step >= 2 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-[var(--muted)] text-[12px] mb-2">2. select tier</div>
          <div className="grid grid-cols-2 gap-3">
            {TIERS.map((t) => (
              <button
                key={t.id}
                onClick={() => { setSelectedTier(t.id); if (step < 3) setStep(3) }}
                className={`border p-3 text-left text-[12px] font-mono transition-all duration-150 ${
                  selectedTier === t.id
                    ? 'border-[var(--green)] text-[var(--green)]'
                    : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)]'
                }`}
              >
                <div className="font-bold">{t.name}</div>
                <div className="text-[10px] mt-1">${(t.price / 100).toFixed(2)}</div>
                <div className="text-[10px] text-[var(--muted)] mt-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Step 3: Custom config */}
      {step >= 3 && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-[var(--muted)] text-[12px] mb-2">3. custom config (optional)</div>
          <textarea
            value={config}
            onChange={(e) => setConfig(e.target.value)}
            rows={3}
            placeholder="additional parameters..."
            className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[12px] text-[var(--white)] font-mono focus:border-[var(--green)] focus:outline-none resize-y"
          />
          {!paid && (
            <button
              onClick={() => setStep(4)}
              className="mt-2 border border-[var(--green)] text-[var(--green)] px-4 py-2 text-[12px] hover:bg-[var(--green)] hover:text-black transition-all duration-150"
            >
              [next: payment →]
            </button>
          )}
        </motion.div>
      )}

      {/* Step 4: Payment + Run */}
      {step >= 4 && !paid && tier && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-[var(--muted)] text-[12px] mb-2">4. payment</div>
          <PaymentMethodSelector
            effectivePrice={tier.price}
            discountPct={20}
            onSelect={() => {}}
            onConfirm={() => setPaid(true)}
            isLoading={false}
          />
        </motion.div>
      )}

      {paid && (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="text-[var(--green)] text-[12px] mb-2">[ok] payment confirmed — running...</div>
          <RunOutputViewer />
        </motion.div>
      )}
    </div>
  )
}

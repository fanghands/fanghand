'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { Hand, HandReview } from '@/types/hand'
import { HandPricingCard } from './HandPricingCard'
import { HandReviews } from './HandReviews'
import { CopyButton } from '@/components/common/CopyButton'
import { formatPrice } from '@/lib/utils/formatters'

interface HandDetailProps {
  hand: Hand
  reviews: HandReview[]
  onActivate: () => void
}

type Tab = 'overview' | 'pricing' | 'reviews'

function highlightToml(raw: string): JSX.Element[] {
  const lines = raw.split('\\n')
  return lines.map((line, i) => {
    if (line.startsWith('[')) {
      return (
        <div key={i}>
          <span className="text-[var(--blue)]">{line}</span>
        </div>
      )
    }
    const eqIndex = line.indexOf(' = ')
    if (eqIndex !== -1) {
      const key = line.slice(0, eqIndex)
      const value = line.slice(eqIndex)
      return (
        <div key={i}>
          <span className="text-[var(--green)]">{key}</span>
          <span className="text-[var(--muted)]">{value}</span>
        </div>
      )
    }
    return (
      <div key={i}>
        <span className="text-[var(--muted)]">{line || '\u00A0'}</span>
      </div>
    )
  })
}

function renderRating(rating: number): string {
  if (rating === 0) return '\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591\u2591 \u2014'
  const filled = Math.round(rating * 2)
  const empty = 10 - filled
  return '\u2588'.repeat(filled) + '\u2591'.repeat(empty) + ' ' + rating.toFixed(1)
}

export function HandDetail({ hand, reviews, onActivate }: HandDetailProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const isOfficial = hand.badge === 'OFFICIAL'
  const isFree = hand.price_monthly_cents === null
  const isPending = hand.status === 'pending'

  const tabs: Tab[] = ['overview', 'pricing', 'reviews']

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-6">
      {/* main content */}
      <div>
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mb-6"
        >
          <div className="flex items-center gap-3 mb-3">
            <span
              className={`text-[10px] px-2 py-0.5 border ${
                isOfficial
                  ? 'border-[var(--green)] text-[var(--green)]'
                  : 'border-[var(--muted-2)] text-[var(--muted)]'
              }`}
            >
              {hand.badge}
            </span>
            {isPending && (
              <span className="text-[10px] px-2 py-0.5 border border-[var(--amber)] text-[var(--amber)]">
                PENDING
              </span>
            )}
            <span className="text-[10px] text-[var(--muted)]">v{hand.version}</span>
          </div>
          <h1 className="text-[24px] text-[var(--white)] font-medium mb-2">
            {hand.emoji} {hand.name}
          </h1>
          <div className="text-[12px] text-[var(--muted)]">
            by {hand.author}
            {hand.author_verified && (
              <span className="text-[var(--green)] ml-1" title="verified">*</span>
            )}
          </div>
        </motion.div>

        {/* tabs */}
        <div className="flex gap-1 mb-6 border-b border-[var(--border)]">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2.5 text-[12px] font-mono transition-colors duration-150 cursor-crosshair border-b-2 -mb-[1px] ${
                activeTab === tab
                  ? 'border-[var(--green)] text-[var(--green)]'
                  : 'border-transparent text-[var(--muted)] hover:text-[var(--white)]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* tab content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* description */}
              <div>
                <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">description</div>
                <div className="text-[var(--white)] text-[13px] leading-relaxed">
                  {hand.description}
                </div>
              </div>

              {/* features */}
              <div>
                <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">features</div>
                <div className="space-y-1">
                  {hand.features.map((feat) => (
                    <div key={feat} className="text-[12px] text-[var(--muted)] leading-6">
                      <span className="text-[var(--green)] mr-2">+</span>
                      {feat}
                    </div>
                  ))}
                </div>
              </div>

              {/* TOML preview */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider">HAND.toml</div>
                  <CopyButton text={hand.toml_preview.replace(/\\n/g, '\n')} label="[copy toml]" />
                </div>
                <div className="border border-[var(--border)] bg-[var(--surface)] p-4 overflow-x-auto">
                  <pre className="text-[12px] leading-5 font-mono">
                    {highlightToml(hand.toml_preview)}
                  </pre>
                </div>
              </div>

              {/* system prompt preview */}
              {hand.system_prompt_preview && (
                <div>
                  <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">system prompt (preview)</div>
                  <div className="border border-[var(--border)] bg-[var(--surface)] p-4">
                    <div className="text-[12px] text-[var(--muted)] leading-relaxed font-mono italic">
                      &quot;{hand.system_prompt_preview}&quot;
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'pricing' && (
            <HandPricingCard
              priceMonthly={hand.price_monthly_cents}
              pricePerRun={hand.price_per_run_cents}
            />
          )}

          {activeTab === 'reviews' && (
            <HandReviews
              reviews={reviews}
              averageRating={hand.rating}
              totalReviews={hand.reviews_count}
            />
          )}
        </motion.div>
      </div>

      {/* sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
        className="space-y-4"
      >
        {/* activate CTA */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-[12px] mb-3">
            <span className="text-[var(--muted)]">price: </span>
            <span className={isFree ? 'text-[var(--green)]' : 'text-[var(--amber)]'}>
              {isFree ? 'free' : formatPrice(hand.price_monthly_cents) + '/mo'}
            </span>
          </div>
          <button
            onClick={onActivate}
            disabled={isPending}
            className={`w-full px-4 py-2.5 text-[12px] border font-mono transition-colors duration-150 cursor-crosshair ${
              isPending
                ? 'border-[var(--muted-2)] text-[var(--muted)] cursor-not-allowed'
                : 'border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)]'
            }`}
          >
            {isPending ? '[coming soon]' : '[activate]'}
          </button>
        </div>

        {/* stats */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-5 space-y-3">
          <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-2">stats</div>
          <div className="text-[11px]">
            <span className="text-[var(--muted)]">activations: </span>
            <span className="text-[var(--white)] tabular-nums">{hand.activations > 0 ? hand.activations : '\u2014'}</span>
          </div>
          <div className="text-[11px]">
            <span className="text-[var(--muted)]">rating: </span>
            <span className="text-[var(--green)] font-mono">{renderRating(hand.rating)}</span>
          </div>
          <div className="text-[11px]">
            <span className="text-[var(--muted)]">reviews: </span>
            <span className="text-[var(--white)] tabular-nums">{hand.reviews_count}</span>
          </div>
          <div className="text-[11px]">
            <span className="text-[var(--muted)]">version: </span>
            <span className="text-[var(--white)]">{hand.version}</span>
          </div>
          <div className="text-[11px]">
            <span className="text-[var(--muted)]">status: </span>
            <span className={hand.status === 'active' ? 'text-[var(--green)]' : 'text-[var(--amber)]'}>
              {hand.status}
            </span>
          </div>
        </div>

        {/* categories */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-5">
          <div className="text-[var(--muted)] text-[10px] uppercase tracking-wider mb-3">categories</div>
          <div className="flex flex-wrap gap-2">
            {hand.category.map((cat) => (
              <span
                key={cat}
                className="px-2 py-0.5 text-[10px] border border-[var(--border)] text-[var(--muted)]"
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

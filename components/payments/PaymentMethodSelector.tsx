'use client'

import { useState } from 'react'

type PaymentMethod = 'stripe' | 'sol' | 'fgh' | 'usdc' | 'credit'

interface PaymentMethodSelectorProps {
  effectivePrice: number // in cents
  discountPct: number
  onSelect: (method: PaymentMethod) => void
  onConfirm: () => void
  isLoading: boolean
}

const SOL_PRICE = 150 // mock $150/SOL
const USDC_RATE = 1

export function PaymentMethodSelector({
  effectivePrice,
  discountPct,
  onSelect,
  onConfirm,
  isLoading,
}: PaymentMethodSelectorProps) {
  const [active, setActive] = useState<PaymentMethod>('stripe')

  const priceUsd = effectivePrice / 100
  const priceSol = (priceUsd / SOL_PRICE).toFixed(4)
  const fghPrice = (priceUsd * (1 - discountPct / 100)).toFixed(2)
  const priceUsdc = priceUsd.toFixed(2)

  const tabs: { key: PaymentMethod; label: string }[] = [
    { key: 'stripe', label: 'Stripe Card' },
    { key: 'sol', label: 'SOL' },
    { key: 'fgh', label: `$FGH (${discountPct}% off)` },
    { key: 'usdc', label: 'USDC' },
    { key: 'credit', label: 'Credit Wallet' },
  ]

  const handleTab = (key: PaymentMethod) => {
    setActive(key)
    onSelect(key)
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] font-mono text-[12px]">
      <div className="flex border-b border-[var(--border)] overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => handleTab(t.key)}
            className={`px-3 py-2 whitespace-nowrap transition-all duration-150 border-b-2 ${
              active === t.key
                ? 'border-[var(--green)] text-[var(--green)]'
                : 'border-transparent text-[var(--muted)] hover:text-[var(--white)]'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {active === 'stripe' && (
          <div className="space-y-3">
            <div className="text-[var(--muted)]">pay ${priceUsd.toFixed(2)} via Stripe</div>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="border border-[var(--blue)] text-[var(--blue)] px-4 py-2 hover:bg-[var(--blue)] hover:text-white transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? 'processing...' : '[checkout with Stripe →]'}
            </button>
          </div>
        )}
        {active === 'sol' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">price</span>
              <span>{priceSol} SOL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">wallet balance</span>
              <span className="text-[var(--green)]">2.45 SOL</span>
            </div>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? 'processing...' : '[pay]'}
            </button>
          </div>
        )}
        {active === 'fgh' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">original price</span>
              <span className="line-through text-[var(--muted)]">${priceUsd.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">with {discountPct}% discount</span>
              <span className="text-[var(--green)]">${fghPrice}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">FGH balance</span>
              <span className="text-[var(--green)]">15,000 FGH</span>
            </div>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? 'processing...' : '[pay with $FGH]'}
            </button>
          </div>
        )}
        {active === 'usdc' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">price</span>
              <span>{priceUsdc} USDC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">wallet balance</span>
              <span className="text-[var(--green)]">250.00 USDC</span>
            </div>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? 'processing...' : '[pay]'}
            </button>
          </div>
        )}
        {active === 'credit' && (
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">credit balance</span>
              <span className="text-[var(--green)]">$12.50</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--muted)]">charge</span>
              <span>${priceUsd.toFixed(2)}</span>
            </div>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
            >
              {isLoading ? 'processing...' : '[pay from credit]'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

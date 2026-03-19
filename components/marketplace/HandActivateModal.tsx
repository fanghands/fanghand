'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Hand } from '@/types/hand'
import { HandConfigForm } from './HandConfigForm'
import { formatPrice } from '@/lib/utils/formatters'
import { createActivation } from '@/lib/api/activations'

interface HandActivateModalProps {
  hand: Hand | null
  onClose: () => void
}

type Step = 'config' | 'payment' | 'confirming' | 'success' | 'error'

const PAYMENT_METHODS = [
  { id: 'stripe_card', label: 'credit card (stripe)', icon: '\u{1F4B3}' },
  { id: 'sol', label: 'SOL', icon: '\u{25C6}' },
  { id: 'fgh', label: '$FGH (20% discount)', icon: '\u{1F525}' },
  { id: 'usdc', label: 'USDC', icon: '\u{1F4B5}' },
] as const

export function HandActivateModal({ hand, onClose }: HandActivateModalProps) {
  const [step, setStep] = useState<Step>('config')
  const [config, setConfig] = useState<Record<string, unknown>>({})
  const [selectedPayment, setSelectedPayment] = useState<string>('stripe_card')

  useEffect(() => {
    if (hand) {
      setStep('config')
      setConfig({})
      setSelectedPayment('stripe_card')
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [hand])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (hand) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [hand, handleKeyDown])

  const handleConfigSubmit = useCallback((cfg: Record<string, unknown>) => {
    setConfig(cfg)
    setStep('payment')
  }, [])

  const handleActivate = useCallback(async () => {
    if (!hand) return
    setStep('confirming')
    try {
      await createActivation({
        hand_id: hand.id,
        config,
        payment_currency: selectedPayment === 'stripe_card' ? 'usd' : selectedPayment,
      })
      setStep('success')
    } catch {
      setStep('error')
    }
  }, [hand, config, selectedPayment])

  if (!hand) return null

  const isFree = hand.price_monthly_cents === null && hand.price_per_run_cents === null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-black/80" />

        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-md border border-[var(--border)] bg-[var(--bg)] max-h-[80vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* header */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)] sticky top-0 bg-[var(--bg)]">
            <span className="text-[13px] text-[var(--white)]">
              activate: {hand.name}
            </span>
            <button
              onClick={onClose}
              className="text-[var(--muted)] hover:text-[var(--white)] text-[13px] cursor-crosshair transition-colors duration-150"
            >
              [close]
            </button>
          </div>

          {/* step indicator */}
          <div className="px-5 py-3 border-b border-[var(--border)]">
            <div className="flex gap-4 text-[10px] font-mono">
              {(['config', 'payment', 'confirming', 'success'] as const).map((s, i) => (
                <span
                  key={s}
                  className={
                    step === s
                      ? 'text-[var(--green)]'
                      : step === 'error'
                      ? 'text-[var(--red)]'
                      : 'text-[var(--muted-2)]'
                  }
                >
                  {i + 1}. {s}
                </span>
              ))}
            </div>
          </div>

          {/* content */}
          <div className="px-5 py-4">
            <AnimatePresence mode="wait">
              {step === 'config' && (
                <motion.div
                  key="config"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[var(--muted)] text-[11px] mb-4 uppercase tracking-wider">
                    step 1: configure settings
                  </div>
                  {hand.settings_schema ? (
                    <HandConfigForm
                      schema={hand.settings_schema}
                      onSubmit={handleConfigSubmit}
                    />
                  ) : (
                    <div>
                      <div className="text-[var(--muted)] text-[12px] mb-4">
                        no configuration required for this hand.
                      </div>
                      <button
                        onClick={() => handleConfigSubmit({})}
                        className="w-full px-4 py-2 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)] transition-colors duration-150 cursor-crosshair font-mono"
                      >
                        [continue]
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {step === 'payment' && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-[var(--muted)] text-[11px] mb-4 uppercase tracking-wider">
                    step 2: select payment
                  </div>

                  {isFree ? (
                    <div className="text-[var(--green)] text-[13px] mb-4 font-mono">
                      this hand is free to activate.
                    </div>
                  ) : (
                    <>
                      <div className="text-[var(--white)] text-[12px] mb-4">
                        price: {formatPrice(hand.price_monthly_cents)}/month
                      </div>
                      <div className="space-y-2 mb-4">
                        {PAYMENT_METHODS.map((method) => (
                          <button
                            key={method.id}
                            onClick={() => setSelectedPayment(method.id)}
                            className={`w-full px-4 py-2.5 text-[12px] border transition-colors duration-150 cursor-crosshair font-mono text-left flex items-center gap-2 ${
                              selectedPayment === method.id
                                ? 'border-[var(--green)] text-[var(--green)]'
                                : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)]'
                            }`}
                          >
                            <span>{method.icon}</span>
                            <span>{method.label}</span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}

                  <button
                    onClick={handleActivate}
                    className="w-full px-4 py-2 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)] transition-colors duration-150 cursor-crosshair font-mono"
                  >
                    [activate hand]
                  </button>
                </motion.div>
              )}

              {step === 'confirming' && (
                <motion.div
                  key="confirming"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="py-10 text-center"
                >
                  <motion.div
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                    className="text-[var(--green)] text-[14px] font-mono"
                  >
                    activating {hand.name}...
                  </motion.div>
                  <div className="text-[var(--muted)] text-[11px] mt-3">
                    preparing agent runtime
                  </div>
                </motion.div>
              )}

              {step === 'success' && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="py-10 text-center"
                >
                  <div className="text-[var(--green)] text-[16px] font-mono mb-2">
                    activation complete.
                  </div>
                  <div className="text-[var(--muted)] text-[12px] mb-6">
                    {hand.name} is now running. your first cycle begins shortly.
                  </div>
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)] transition-colors duration-150 cursor-crosshair font-mono"
                  >
                    [close]
                  </button>
                </motion.div>
              )}

              {step === 'error' && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="py-10 text-center"
                >
                  <div className="text-[var(--red)] text-[14px] font-mono mb-2">
                    activation failed.
                  </div>
                  <div className="text-[var(--muted)] text-[12px] mb-6">
                    something went wrong. please try again.
                  </div>
                  <button
                    onClick={() => setStep('config')}
                    className="px-4 py-2 text-[12px] border border-[var(--border)] text-[var(--muted)] hover:text-[var(--white)] hover:border-[var(--border-active)] transition-colors duration-150 cursor-crosshair font-mono"
                  >
                    [retry]
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* footer */}
          <div className="px-5 py-3 border-t border-[var(--border)]">
            <span className="text-[11px] text-[var(--muted)]">
              press ESC or click outside to close
            </span>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

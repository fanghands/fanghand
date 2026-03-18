'use client'

import { motion, AnimatePresence } from 'framer-motion'

const WALLETS = [
  { name: 'Phantom', icon: '👻' },
  { name: 'Solflare', icon: '☀️' },
  { name: 'Backpack', icon: '🎒' },
]

interface WalletModalProps {
  open: boolean
  onClose: () => void
  onConnect: (wallet: string) => void
}

export function WalletModal({ open, onClose, onConnect }: WalletModalProps) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 border border-[var(--border)] bg-[var(--surface)] p-6 w-[320px]"
          >
            <div className="text-[12px] text-[var(--muted)] mb-4 border-b border-[var(--border)] pb-2">
              select wallet
            </div>
            <div className="space-y-2">
              {WALLETS.map((w) => (
                <button
                  key={w.name}
                  onClick={() => onConnect(w.name)}
                  className="w-full flex items-center justify-between border border-[var(--border)] px-3 py-2 text-[12px] font-mono hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
                >
                  <span className="flex items-center gap-2">
                    <span>{w.icon}</span>
                    <span>{w.name}</span>
                  </span>
                  <span className="text-[var(--muted)]">[connect]</span>
                </button>
              ))}
            </div>
            <button
              onClick={onClose}
              className="mt-4 text-[12px] text-[var(--muted)] hover:text-[var(--white)] font-mono"
            >
              [cancel]
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

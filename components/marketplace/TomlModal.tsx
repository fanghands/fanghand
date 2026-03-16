'use client'

import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Hand } from '@/lib/marketplace-data'

interface TomlModalProps {
  hand: Hand | null
  onClose: () => void
}

function highlightToml(raw: string): JSX.Element[] {
  const lines = raw.split('\\n')
  return lines.map((line, i) => {
    // Section headers [xxx]
    if (line.startsWith('[')) {
      return (
        <div key={i}>
          <span className="text-[var(--blue)]">{line}</span>
        </div>
      )
    }
    // Key = value
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
    // Empty or other
    return (
      <div key={i}>
        <span className="text-[var(--muted)]">{line || '\u00A0'}</span>
      </div>
    )
  })
}

export function TomlModal({ hand, onClose }: TomlModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    },
    [onClose]
  )

  useEffect(() => {
    if (hand) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [hand, handleKeyDown])

  return (
    <AnimatePresence>
      {hand && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          onClick={onClose}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/80" />

          {/* modal */}
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="relative w-full max-w-lg border border-[var(--border)] bg-[var(--bg)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-[var(--border)]">
              <span className="text-[13px] text-[var(--white)]">{hand.name}/HAND.toml</span>
              <button
                onClick={onClose}
                className="text-[var(--muted)] hover:text-[var(--white)] text-[13px] cursor-pointer transition-colors duration-150"
              >
                [close]
              </button>
            </div>

            {/* code */}
            <div className="px-5 py-4 overflow-x-auto">
              <pre className="text-[12px] leading-5 font-mono">
                {highlightToml(hand.toml_preview)}
              </pre>
            </div>

            {/* footer */}
            <div className="px-5 py-3 border-t border-[var(--border)]">
              <span className="text-[11px] text-[var(--muted)]">
                press ESC or click outside to close
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

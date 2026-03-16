'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const STORAGE_KEY = 'fanghand_announcement_dismissed'

export function AnnouncementBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(STORAGE_KEY)
      if (!dismissed) {
        const timer = setTimeout(() => setVisible(true), 2000)
        return () => clearTimeout(timer)
      }
    } catch {
      // ignore
    }
  }, [])

  const dismiss = () => {
    setVisible(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      // ignore
    }
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="fixed bottom-12 left-4 right-4 z-[90] flex justify-center pointer-events-none"
        >
          <div className="pointer-events-auto w-full max-w-lg border border-[var(--green)] bg-[var(--bg)] shadow-[0_0_30px_rgba(0,255,136,0.08)]">
            {/* green accent bar */}
            <div className="h-0.5 w-full bg-[var(--green)]" />

            <div className="px-5 py-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] text-[var(--green)] mb-1">NEW</div>
                  <div className="text-[var(--white)] text-[14px] font-medium mb-1">
                    FangHands Marketplace is live
                  </div>
                  <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-3">
                    browse autonomous Hands, activate agents, earn $FGH. community builders welcome.
                  </p>
                  <a
                    href="/marketplace"
                    className="inline-block px-4 py-1.5 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    [explore marketplace →]
                  </a>
                </div>
                <button
                  onClick={dismiss}
                  className="text-[var(--muted)] hover:text-[var(--white)] text-[13px] cursor-pointer shrink-0 transition-colors duration-150"
                >
                  [x]
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

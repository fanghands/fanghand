'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HERO_LINES } from '@/lib/constants'

const CHAR_INTERVAL = 18

export function Hero() {
  const [displayedLines, setDisplayedLines] = useState<string[]>([''])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  const skip = useCallback(() => {
    if (!done) {
      setDisplayedLines([...HERO_LINES])
      setDone(true)
    }
  }, [done])

  useEffect(() => {
    if (done) return

    const line = HERO_LINES[currentLine]
    if (!line) return

    if (currentChar < line.length) {
      const timer = setTimeout(() => {
        setDisplayedLines((prev) => {
          const next = [...prev]
          next[currentLine] = line.slice(0, currentChar + 1)
          return next
        })
        setCurrentChar((c) => c + 1)
      }, CHAR_INTERVAL)
      return () => clearTimeout(timer)
    } else {
      if (currentLine < HERO_LINES.length - 1) {
        const timer = setTimeout(() => {
          setCurrentLine((l) => l + 1)
          setCurrentChar(0)
          setDisplayedLines((prev) => [...prev, ''])
        }, 80)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => setDone(true), 200)
        return () => clearTimeout(timer)
      }
    }
  }, [currentLine, currentChar, done])

  return (
    <section
      className="min-h-screen flex flex-col items-center justify-center px-4 py-20 cursor-pointer"
      onClick={skip}
    >
      <div className="w-full max-w-2xl">
        {/* Terminal output */}
        <div className="mb-10">
          {displayedLines.map((line, i) => (
            <div key={i} className="flex items-baseline">
              <span className="text-[var(--muted)] text-[13px] leading-7 whitespace-pre">{line}</span>
              {i === currentLine && !done && (
                <span className="animate-blink text-[var(--green)] ml-0.5">█</span>
              )}
            </div>
          ))}
          {done && (
            <span className="animate-blink text-[var(--green)]">█</span>
          )}
          {!done && (
            <div className="mt-4 text-[11px] text-[var(--muted-2)]">click to skip</div>
          )}
        </div>

        {/* Hero content */}
        <AnimatePresence>
          {done && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            >
              <h1
                className="text-[clamp(40px,8vw,64px)] font-medium text-[var(--white)] tracking-tight mb-4 leading-none"
              >
                FANGHAND
              </h1>
              <p className="text-[var(--muted)] text-[14px] mb-10 max-w-md">
                autonomous agents. community votes. agents execute.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`https://pump.fun/coin/29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-[13px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
                >
                  [buy $FGH]
                </a>
                <a
                  href="https://solscan.io/token/29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 text-[13px] border border-[var(--white)] text-[var(--white)] hover:bg-[var(--white)] hover:text-black transition-colors duration-150 cursor-pointer"
                >
                  [view on-chain]
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

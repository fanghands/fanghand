'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HANDS, FILTER_OPTIONS, type FilterOption, type Hand } from '@/lib/marketplace-data'
import { FilterBar } from '@/components/marketplace/FilterBar'
import { HandCard } from '@/components/marketplace/HandCard'
import { TomlModal } from '@/components/marketplace/TomlModal'
import { BuildCTA } from '@/components/marketplace/BuildCTA'
import { CONTRACT_ADDRESS, CONTRACT_SHORT } from '@/lib/constants'

const TYPEWRITER_LINES = [
  '> loading marketplace...',
  '> indexing 8 autonomous hands...',
  '> revenue share: ACTIVE',
  '> marketplace.fanghand.xyz ready.',
]

const CHAR_INTERVAL = 18

function TypewriterHero({ onDone }: { onDone: () => void }) {
  const [displayedLines, setDisplayedLines] = useState<string[]>([''])
  const [currentLine, setCurrentLine] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)
  const [done, setDone] = useState(false)

  const skip = useCallback(() => {
    if (!done) {
      setDisplayedLines([...TYPEWRITER_LINES])
      setDone(true)
      onDone()
    }
  }, [done, onDone])

  useEffect(() => {
    if (done) return

    const line = TYPEWRITER_LINES[currentLine]
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
      if (currentLine < TYPEWRITER_LINES.length - 1) {
        const timer = setTimeout(() => {
          setCurrentLine((l) => l + 1)
          setCurrentChar(0)
          setDisplayedLines((prev) => [...prev, ''])
        }, 80)
        return () => clearTimeout(timer)
      } else {
        const timer = setTimeout(() => {
          setDone(true)
          onDone()
        }, 200)
        return () => clearTimeout(timer)
      }
    }
  }, [currentLine, currentChar, done, onDone])

  return (
    <div className="mb-10 cursor-pointer" onClick={skip}>
      {displayedLines.map((line, i) => (
        <div key={i} className="flex items-baseline">
          <span className="text-[var(--muted)] text-[13px] leading-7 whitespace-pre">{line}</span>
          {i === currentLine && !done && (
            <span className="animate-blink text-[var(--green)] ml-0.5">█</span>
          )}
        </div>
      ))}
      {done && <span className="animate-blink text-[var(--green)]">█</span>}
      {!done && (
        <div className="mt-4 text-[11px] text-[var(--muted-2)]">click to skip</div>
      )}
    </div>
  )
}

export default function Home() {
  const [heroDone, setHeroDone] = useState(false)
  const [filter, setFilter] = useState<FilterOption>('all')
  const [tomlHand, setTomlHand] = useState<Hand | null>(null)

  const totalHands = HANDS.length
  const activeHands = HANDS.filter((h) => h.active).length
  const totalActivations = HANDS.reduce((sum, h) => sum + h.installs, 0)

  const filtered = HANDS.filter((hand) => {
    if (filter === 'all') return true
    if (filter === 'official') return hand.badge === 'OFFICIAL'
    if (filter === 'community') return hand.badge === 'COMMUNITY'
    if (filter === 'free') return hand.price === 'free'
    return hand.category.includes(filter)
  })

  return (
    <main className="pb-14">
      {/* Demo disclaimer */}
      <div className="border-b border-[var(--amber)] bg-[var(--amber-dim)] px-4 py-2.5 text-center">
        <span className="text-[12px] text-[var(--amber)]">
          ⚠ concept showcase — this marketplace is not live. hands are not functional yet.
        </span>
      </div>

      {/* Hero */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-6xl">
          <TypewriterHero onDone={() => setHeroDone(true)} />

          <AnimatePresence>
            {heroDone && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src="/fanghand_icon_128.png"
                    alt="FangHand"
                    className="w-14 h-14"
                  />
                  <h1 className="text-[clamp(32px,7vw,56px)] font-medium text-[var(--white)] tracking-tight leading-none">
                    fanghand marketplace
                  </h1>
                </div>
                <p className="text-[var(--muted)] text-[14px] mb-8 max-w-lg">
                  autonomous AI hands built on OpenFang. activate one. it works while you sleep.
                  builders earn $FGH. every activation fuels the ecosystem.
                </p>

                {/* Stats row */}
                <div className="flex flex-wrap gap-3 mb-8 text-[12px]">
                  <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
                    {totalHands} hands
                  </span>
                  <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
                    {activeHands} active
                  </span>
                  <span className="border border-[var(--border)] px-3 py-1.5 text-[var(--white)]">
                    {totalActivations.toLocaleString()} activations
                  </span>
                  <span className="border border-[var(--amber)] px-3 py-1.5 text-[var(--amber)]">
                    status: concept
                  </span>
                </div>

                {/* CTAs */}
                <div className="flex flex-wrap gap-3">
                  <a
                    href="#hands"
                    className="px-5 py-2.5 text-[13px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    [browse hands]
                  </a>
                  <a
                    href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-[13px] border border-[var(--white)] text-[var(--white)] hover:bg-[var(--white)] hover:text-black transition-colors duration-150 cursor-pointer"
                  >
                    [buy $FGH]
                  </a>
                  <a
                    href="/openfang"
                    className="px-5 py-2.5 text-[13px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
                  >
                    [what is OpenFang?]
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* How it works */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-title">how_it_works()</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                step: '01',
                title: 'browse & activate',
                desc: 'pick a Hand from the marketplace. official or community-built. activate it on OpenFang with one command.',
              },
              {
                step: '02',
                title: 'hands work 24/7',
                desc: 'your Hand runs autonomously — collecting intel, posting, analyzing, or whatever it was built to do.',
              },
              {
                step: '03',
                title: 'earn $FGH',
                desc: 'every activation generates revenue. builders earn. a % flows to treasury for buybacks and burns.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.08 }}
                className="border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--border-active)] transition-colors duration-200"
              >
                <div className="text-[var(--green)] text-[11px] mb-3">{item.step}</div>
                <div className="text-[var(--white)] text-[14px] font-medium mb-2">{item.title}</div>
                <div className="text-[12px] text-[var(--muted)] leading-relaxed">{item.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Revenue banner */}
      <div className="px-4 py-4 max-w-6xl mx-auto w-full">
        <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-3 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[12px] text-[var(--muted)]">
            every Hand activation generates revenue. a % flows to $FGH treasury. builders earn. token burns.
          </span>
          <span className="text-[12px] text-[var(--green)]">
            deflationary flywheel: active
          </span>
        </div>
      </div>

      {/* Hands grid */}
      <section id="hands" className="px-4 py-8 max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="section-title">hands.list()</div>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTER_OPTIONS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-[12px] border transition-colors duration-150 cursor-pointer ${
                filter === f
                  ? 'border-[var(--green)] text-[var(--green)]'
                  : 'border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)]'
              }`}
            >
              [{f}]
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((hand, i) => (
            <HandCard key={hand.id} hand={hand} index={i} onViewToml={setTomlHand} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[var(--muted)] text-[13px]">
            no hands match this filter.
          </div>
        )}
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Build CTA */}
      <BuildCTA />

      <div className="border-t border-[var(--border)]" />

      {/* Footer */}
      <footer className="px-4 py-5 max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[var(--muted)]">
          <a
            href="https://twitter.com/fanghandx"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--white)] transition-colors duration-150"
          >
            @fanghandx
          </a>
          <span>·</span>
          <a
            href="https://twitter.com/openfangg"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--white)] transition-colors duration-150"
          >
            @openfangg
          </a>
          <span>·</span>
          <a
            href="/openfang"
            className="hover:text-[var(--green)] transition-colors duration-150"
          >
            built on OpenFang v0.3+
          </a>
          <span>·</span>
          <span>powered by claude sonnet</span>
          <span>·</span>
          <span className="text-[var(--muted)]">CA: {CONTRACT_SHORT}</span>
        </div>
      </footer>

      {/* TOML modal */}
      <TomlModal hand={tomlHand} onClose={() => setTomlHand(null)} />
    </main>
  )
}

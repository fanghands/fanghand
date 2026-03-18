'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { HANDS, FILTER_OPTIONS, type FilterOption, type Hand } from '@/lib/marketplace-data'
import { HandCard } from '@/components/marketplace/HandCard'
import { TomlModal } from '@/components/marketplace/TomlModal'
import { CONTRACT_ADDRESS, CONTRACT_SHORT } from '@/lib/constants'

/* ──────────────────────────────────────────────
   MATRIX RAIN CANVAS
   ────────────────────────────────────────────── */
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let columns: number[] = []
    const fontSize = 14
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン01'

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const colCount = Math.floor(canvas.width / fontSize)
      columns = Array(colCount).fill(0).map(() => Math.random() * canvas.height / fontSize)
    }

    resize()
    window.addEventListener('resize', resize)

    let hidden = false
    const onVisibility = () => { hidden = document.hidden }
    document.addEventListener('visibilitychange', onVisibility)

    const draw = () => {
      if (hidden) {
        animationId = requestAnimationFrame(draw)
        return
      }

      ctx.fillStyle = 'rgba(10, 10, 10, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#00ff8815'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < columns.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillText(char, i * fontSize, columns[i] * fontSize)

        if (columns[i] * fontSize > canvas.height && Math.random() > 0.975) {
          columns[i] = 0
        }
        columns[i]++
      }

      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.4 }}
    />
  )
}

/* ──────────────────────────────────────────────
   TERMINAL TOP BAR
   ────────────────────────────────────────────── */
function TerminalTopBar() {
  return (
    <div className="sticky top-0 z-40 h-9 flex items-center px-4 gap-3 bg-[var(--surface)] border-b border-[var(--border)]">
      <div className="flex items-center gap-1.5 shrink-0">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <span className="text-[12px] text-[var(--muted)] ml-2">fanghand-cli — bash</span>
      <nav className="flex items-center gap-4 ml-auto text-[12px]">
        <a href="/marketplace" className="text-[var(--green)] hover:text-[var(--white)] transition-colors duration-100">[marketplace]</a>
        <a href="/dashboard" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">[dashboard]</a>
        <a href="/builders" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">[builders]</a>
        <a href="/login" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">[connect]</a>
      </nav>
      <span className="animate-blink text-[var(--green)] text-[12px] ml-3 shrink-0">▊</span>
    </div>
  )
}

/* ──────────────────────────────────────────────
   ANIMATED COUNTER (counts up on scroll)
   ────────────────────────────────────────────── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return

    // If value is not a number (like ∞), just set it directly
    const numericMatch = value.match(/^[\d.]+/)
    if (!numericMatch) {
      setDisplay(value)
      return
    }

    const target = parseFloat(numericMatch[0])
    const suffix = value.slice(numericMatch[0].length)
    const isFloat = value.includes('.')
    const duration = 1200
    const steps = 40
    const stepTime = duration / steps
    let current = 0

    const timer = setInterval(() => {
      current++
      const progress = current / steps
      const eased = 1 - Math.pow(1 - progress, 3) // easeOutCubic
      const val = target * eased

      if (current >= steps) {
        setDisplay(isFloat ? target.toFixed(3) : Math.round(target).toString())
        clearInterval(timer)
      } else {
        setDisplay(isFloat ? val.toFixed(3) : Math.round(val).toString())
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [isInView, value])

  return (
    <div ref={ref} className="flex-1 min-w-[140px] px-5 py-6 text-center">
      <div className="text-[48px] font-medium text-[var(--white)] leading-none tabular-nums tracking-tight">
        {display}
      </div>
      <div className="text-[11px] text-[var(--muted)] uppercase tracking-widest mt-2">
        {label}
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   LIVE STATS BAR (section 9)
   ────────────────────────────────────────────── */
function LiveStatsBar() {
  return (
    <section className="px-4 py-12 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="border border-[var(--border)] bg-[var(--surface)] flex flex-wrap divide-x divide-[var(--border)]">
          <AnimatedStat value="7" label="Official Hands" />
          <AnimatedStat value="∞" label="Running 24/7" />
          <AnimatedStat value="50%" label="$FGH burned per payment" />
          <AnimatedStat value="0.005" label="Starting price (SOL)" />
        </div>
      </motion.div>
    </section>
  )
}

/* ──────────────────────────────────────────────
   COPY ADDRESS BUTTON
   ────────────────────────────────────────────── */
function CopyCA() {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS)
    } catch {
      const el = document.createElement('textarea')
      el.value = CONTRACT_ADDRESS
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={copy}
      className="text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-100 cursor-crosshair text-left"
    >
      CA: {CONTRACT_SHORT}{' '}
      <span className="text-[var(--green)]">{copied ? '[copied ✓]' : '[copy]'}</span>
    </button>
  )
}

/* ──────────────────────────────────────────────
   FOOTER (section 10)
   ────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="px-4 pt-16 pb-6 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Column 1: Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <img src="/fanghand_icon_64.png" alt="F" className="w-6 h-6" />
              <span className="text-[var(--white)] text-[14px] font-medium tracking-wide uppercase">FangHand</span>
            </div>
            <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-1">
              The autonomous AI agent marketplace.
            </p>
            <p className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
              Built on{' '}
              <a
                href="https://twitter.com/openfangg"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--green)] transition-colors duration-100"
              >
                @openfangg
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://twitter.com/fanghandx"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100 text-[12px]"
              >
                [Twitter/X]
              </a>
              <a
                href="https://github.com/RightNow-AI/openfang"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100 text-[12px]"
              >
                [GitHub]
              </a>
              <a
                href="/openfang"
                className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100 text-[12px]"
              >
                [Docs]
              </a>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <div className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-4">Product</div>
            <div className="flex flex-col gap-2 text-[12px]">
              <a href="/marketplace" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">Marketplace</a>
              <a href="/dashboard/runs/new" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">Pay-Per-Run</a>
              <a href="/builders" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">For Builders</a>
              <a href="/marketplace" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">Pricing</a>
              <a href="/openfang" className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100">Docs</a>
            </div>
          </div>

          {/* Column 3: $FGH Token */}
          <div>
            <div className="text-[11px] text-[var(--muted)] uppercase tracking-widest mb-4">$FGH Token</div>
            <div className="flex flex-col gap-2 text-[12px]">
              <CopyCA />
              <a
                href={`https://jup.ag/swap/SOL-${CONTRACT_ADDRESS}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--muted)] hover:text-[var(--green)] transition-colors duration-100"
              >
                Jupiter
              </a>
              <span className="text-[var(--muted-2)]">Burn Dashboard</span>
              <span className="text-[var(--muted-2)]">Tokenomics</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-[var(--border)] pt-4 flex flex-wrap items-center justify-between gap-2 text-[11px] text-[var(--muted)]">
          <span>© 2026 FangHand. Built on OpenFang MIT.</span>
          <span>MIT · Rust · Solana · $FGH</span>
        </div>
      </motion.div>
    </footer>
  )
}

/* ──────────────────────────────────────────────
   TYPEWRITER HERO
   ────────────────────────────────────────────── */
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
    <div className="mb-10 cursor-crosshair" onClick={skip}>
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

/* ──────────────────────────────────────────────
   SECTION WRAPPER (staggered fade-in)
   ────────────────────────────────────────────── */
function Section({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────── */
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
    <>
      <MatrixRain />
      <TerminalTopBar />

      <main className="relative z-10 pb-14">
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
                      href="/marketplace"
                      className="px-5 py-2.5 text-[13px] border-2 border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-crosshair"
                    >
                      [marketplace]
                    </a>
                    <a
                      href={`https://pump.fun/coin/${CONTRACT_ADDRESS}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 text-[13px] border-2 border-[var(--white)] text-[var(--white)] hover:bg-[var(--white)] hover:text-black transition-colors duration-150 cursor-crosshair"
                    >
                      [buy $FGH]
                    </a>
                    <a
                      href="/openfang"
                      className="px-5 py-2.5 text-[13px] border-2 border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-crosshair"
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
          <Section>
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
          </Section>
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
          <Section>
            <div className="section-title">hands.list()</div>
          </Section>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-6">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-[12px] border-2 transition-colors duration-150 cursor-crosshair ${
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
        <section className="px-4 py-20 max-w-6xl mx-auto w-full">
          <Section>
            <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-8">
              <div className="text-[var(--white)] text-[18px] font-medium mb-4">
                want to publish a Hand?
              </div>
              <div className="text-[13px] text-[var(--muted)] leading-7 mb-6">
                define your HAND.toml.
                <br />
                deploy on OpenFang.
                <br />
                earn $FGH on every activation.
              </div>
              <div className="flex flex-col gap-2">
                <a
                  href="https://github.com/RightNow-AI/openfang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[var(--green)] hover:text-[var(--white)] transition-colors duration-100"
                >
                  → read the OpenFang Hand development guide
                </a>
                <a
                  href="https://twitter.com/openfangg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] text-[var(--green)] hover:text-[var(--white)] transition-colors duration-100"
                >
                  → join @openfangg to get listed
                </a>
              </div>
            </div>
          </Section>
        </section>

        <div className="border-t border-[var(--border)]" />

        {/* Live Stats Bar */}
        <LiveStatsBar />

        <div className="border-t border-[var(--border)]" />

        {/* Footer */}
        <Footer />
      </main>

      {/* TOML modal */}
      <TomlModal hand={tomlHand} onClose={() => setTomlHand(null)} />
    </>
  )
}

'use client'

import { motion } from 'framer-motion'

const STATS = [
  { label: 'autonomous hands', value: '7' },
  { label: 'built-in tools', value: '38+' },
  { label: 'channel adapters', value: '40' },
  { label: 'LLM providers', value: '27' },
  { label: 'security systems', value: '16' },
  { label: 'REST API endpoints', value: '140+' },
]

const HANDS = [
  {
    name: 'collector',
    desc: 'OSINT-style intelligence monitoring. change detection, sentiment analysis, knowledge graph construction.',
    color: 'var(--green)',
  },
  {
    name: 'researcher',
    desc: 'fact-checking engine. CRAAP methodology, cross-referenced sources, cited reports with confidence scores.',
    color: 'var(--blue)',
  },
  {
    name: 'twitter',
    desc: 'autonomous X/Twitter operator. scheduled posting, engagement automation, narrative tracking.',
    color: 'var(--cyan)',
  },
  {
    name: 'lead',
    desc: 'autonomous lead generation with ICP scoring, knowledge graphs, and qualification pipelines.',
    color: 'var(--purple)',
  },
  {
    name: 'clip',
    desc: 'converts long-form video into short-form content with auto-captions and thumbnail generation.',
    color: 'var(--amber)',
  },
  {
    name: 'predictor',
    desc: 'forecasting engine using Brier score calibration. probability estimates with tracked accuracy.',
    color: 'var(--red)',
  },
  {
    name: 'browser',
    desc: 'web automation. form-filling, multi-step workflows, data extraction from any website.',
    color: 'var(--white)',
  },
]

const SECURITY = [
  'WASM dual-metered sandbox (fuel + epoch)',
  'Ed25519 manifest signing',
  'Merkle audit trail',
  'taint tracking across data flows',
  'SSRF protection',
  'secret zeroization on drop',
  'HMAC-SHA256 mutual auth',
  'GCRA rate limiter',
  'subprocess isolation',
  'prompt injection scanning',
  'workspace-confined file ops',
  'encrypted vault storage',
]

const CHANNELS = [
  'Telegram', 'Discord', 'Slack', 'WhatsApp', 'Teams', 'IRC', 'Matrix',
  '+ 33 more adapters',
]

const PROTOCOLS = [
  { name: 'MCP', desc: 'Model Context Protocol — tool integration standard' },
  { name: 'A2A', desc: 'Google Agent-to-Agent — inter-agent task delegation' },
  { name: 'OpenFang Protocol', desc: 'P2P networking between OpenFang instances' },
]

const BENCHMARKS = [
  { metric: 'cold start', openfang: '180ms', others: 'up to 5,980ms' },
  { metric: 'security depth', openfang: '16 systems', others: '1–6 systems' },
  { metric: 'channel adapters', openfang: '40', others: '0–15' },
  { metric: 'LLM providers', openfang: '27 native', others: '3–12' },
]

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="section-title">{children}</div>
  )
}

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
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

export default function OpenFangPage() {
  return (
    <main className="pb-14">
      {/* Header bar */}
      <div className="px-4 py-3 max-w-6xl mx-auto w-full flex items-center justify-between text-[12px] border-b border-[var(--border)]">
        <span className="text-[var(--muted)]">openfang.sh</span>
        <a
          href="/"
          className="text-[var(--muted)] hover:text-[var(--white)] transition-colors duration-150"
        >
          [← back to marketplace]
        </a>
      </div>

      {/* Hero */}
      <section className="px-4 pt-20 pb-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="text-[10px] px-2 py-0.5 border border-[var(--green)] text-[var(--green)]">
              OPEN SOURCE
            </span>
            <span className="text-[10px] px-2 py-0.5 border border-[var(--muted-2)] text-[var(--muted)]">
              MIT LICENSE
            </span>
            <span className="text-[10px] px-2 py-0.5 border border-[var(--muted-2)] text-[var(--muted)]">
              BUILT IN RUST
            </span>
          </div>

          <h1 className="text-[clamp(32px,7vw,56px)] font-medium text-[var(--white)] tracking-tight leading-none mb-4">
            OpenFang
          </h1>
          <p className="text-[var(--green)] text-[16px] mb-3">
            the agent operating system.
          </p>
          <p className="text-[var(--muted)] text-[14px] mb-10 max-w-2xl leading-relaxed">
            open-source Agent OS built in Rust. 14 crates, 137K lines of code, zero clippy warnings.
            deploy autonomous AI agents called Hands that run on schedules, build knowledge graphs,
            and report to your dashboard. battle-tested architecture.
          </p>

          {/* Install command */}
          <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-3 mb-10 max-w-lg">
            <div className="text-[11px] text-[var(--muted)] mb-1">install</div>
            <code className="text-[13px] text-[var(--green)]">
              curl -fsSL https://openfang.sh/install | sh
            </code>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <a
              href="https://www.openfang.sh/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-[13px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
            >
              [visit openfang.sh]
            </a>
            <a
              href="https://github.com/RightNow-AI/openfang"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-[13px] border border-[var(--white)] text-[var(--white)] hover:bg-[var(--white)] hover:text-black transition-colors duration-150 cursor-pointer"
            >
              [github repo]
            </a>
            <a
              href="https://twitter.com/openfangg"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 text-[13px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
            >
              [@openfangg]
            </a>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Stats grid */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <SectionTitle>stats.overview()</SectionTitle>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {STATS.map((stat, i) => (
            <FadeIn key={stat.label} delay={i * 0.05}>
              <div className="border border-[var(--border)] bg-[var(--surface)] p-4 hover:border-[var(--border-active)] transition-colors duration-200 text-center">
                <div className="text-[var(--green)] text-[24px] font-medium mb-1">{stat.value}</div>
                <div className="text-[11px] text-[var(--muted)]">{stat.label}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* What are Hands */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <SectionTitle>hands.explain()</SectionTitle>
          <p className="text-[13px] text-[var(--muted)] mb-8 max-w-2xl leading-relaxed">
            Hands are autonomous capability packages. each Hand is a specialized AI agent
            with its own identity (SOUL.md), memory, schedule, and tools. they run continuously,
            persist state across sessions, and can be chained together. think of them as
            departments in an autonomous company.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {HANDS.map((hand, i) => (
            <FadeIn key={hand.name} delay={i * 0.05}>
              <div className="border border-[var(--border)] bg-[var(--surface)] p-5 hover:border-[var(--border-active)] transition-colors duration-200 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-2 h-2 inline-block"
                    style={{ backgroundColor: hand.color }}
                  />
                  <span className="text-[var(--white)] text-[14px] font-medium">{hand.name}</span>
                </div>
                <div className="text-[12px] text-[var(--muted)] leading-relaxed">{hand.desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Architecture */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <SectionTitle>architecture.deep_dive()</SectionTitle>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Runtime */}
          <FadeIn delay={0.05}>
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 h-full">
              <div className="text-[var(--green)] text-[12px] mb-3">runtime</div>
              <div className="text-[var(--white)] text-[15px] font-medium mb-3">WASM sandboxed execution</div>
              <div className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                tool code runs inside WASM with dual metering (fuel + epoch interruption).
                file operations are workspace-confined. each Hand gets its own isolated
                execution environment with resource limits.
              </div>
              <div className="border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <pre className="text-[11px] text-[var(--muted)] leading-5">
{`[runtime]
sandbox    = "wasm"
metering   = "fuel + epoch"
file_ops   = "workspace-confined"
isolation  = "per-hand"`}
                </pre>
              </div>
            </div>
          </FadeIn>

          {/* Memory */}
          <FadeIn delay={0.1}>
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 h-full">
              <div className="text-[var(--blue)] text-[12px] mb-3">memory</div>
              <div className="text-[var(--white)] text-[15px] font-medium mb-3">persistent knowledge system</div>
              <div className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                SQLite-backed storage with vector embeddings. cross-channel canonical sessions,
                automatic LLM-based compaction, and JSONL session mirroring. agents remember
                everything across restarts.
              </div>
              <div className="border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <pre className="text-[11px] text-[var(--muted)] leading-5">
{`[memory]
backend    = "sqlite + vectors"
sessions   = "cross-channel"
compaction = "llm-based"
mirroring  = "jsonl"`}
                </pre>
              </div>
            </div>
          </FadeIn>

          {/* Workspace */}
          <FadeIn delay={0.15}>
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 h-full">
              <div className="text-[var(--purple)] text-[12px] mb-3">workspace</div>
              <div className="text-[var(--white)] text-[15px] font-medium mb-3">Hand file structure</div>
              <div className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                every Hand gets a standardized workspace with identity, memory, and session files.
                SOUL.md defines the agent&apos;s core purpose. IDENTITY.md holds personality metadata.
                memory persists as dated markdown logs.
              </div>
              <div className="border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <pre className="text-[11px] text-[var(--muted)] leading-5">
{`workspace/
├── SOUL.md        # core identity
├── IDENTITY.md    # personality
├── BOOTSTRAP.md   # first-run protocol
├── MEMORY.md      # persistent knowledge
├── memory/        # dated logs
└── sessions/      # conversation history`}
                </pre>
              </div>
            </div>
          </FadeIn>

          {/* Desktop */}
          <FadeIn delay={0.2}>
            <div className="border border-[var(--border)] bg-[var(--surface)] p-5 h-full">
              <div className="text-[var(--amber)] text-[12px] mb-3">desktop</div>
              <div className="text-[var(--white)] text-[15px] font-medium mb-3">Tauri 2.0 native app</div>
              <div className="text-[12px] text-[var(--muted)] leading-relaxed mb-4">
                native desktop application built with Tauri 2.0. system tray integration,
                native notifications, single-instance enforcement, and auto-start on boot.
                runs on macOS, Linux, and Windows.
              </div>
              <div className="border border-[var(--border)] bg-[var(--bg)] px-4 py-3">
                <pre className="text-[11px] text-[var(--muted)] leading-5">
{`[desktop]
framework  = "tauri 2.0"
tray       = true
autostart  = true
platforms  = ["macos", "linux", "windows"]`}
                </pre>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Security */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <SectionTitle>security.audit()</SectionTitle>
          <p className="text-[13px] text-[var(--muted)] mb-8 max-w-2xl leading-relaxed">
            16 security systems built-in. not bolted on — designed from the ground up.
            every layer is there because agents with tools need guardrails.
          </p>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {SECURITY.map((item, i) => (
            <FadeIn key={item} delay={i * 0.03}>
              <div className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--border-active)] transition-colors duration-200">
                <span className="text-[var(--green)] text-[12px] mr-2">●</span>
                <span className="text-[12px] text-[var(--muted)]">{item}</span>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Channels & Protocols */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Channels */}
          <FadeIn>
            <div>
              <SectionTitle>channels.list()</SectionTitle>
              <p className="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">
                40 channel adapters. your agents communicate wherever your users are.
              </p>
              <div className="flex flex-wrap gap-2">
                {CHANNELS.map((ch) => (
                  <span
                    key={ch}
                    className="text-[12px] px-3 py-1.5 border border-[var(--border)] text-[var(--muted)] hover:text-[var(--white)] hover:border-[var(--border-active)] transition-colors duration-200"
                  >
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Protocols */}
          <FadeIn delay={0.1}>
            <div>
              <SectionTitle>protocols.supported()</SectionTitle>
              <p className="text-[13px] text-[var(--muted)] mb-6 leading-relaxed">
                interoperability-first. agents talk to tools, other agents, and the network.
              </p>
              <div className="flex flex-col gap-3">
                {PROTOCOLS.map((p) => (
                  <div
                    key={p.name}
                    className="border border-[var(--border)] bg-[var(--surface)] px-4 py-3 hover:border-[var(--border-active)] transition-colors duration-200"
                  >
                    <div className="text-[var(--white)] text-[13px] font-medium mb-1">{p.name}</div>
                    <div className="text-[11px] text-[var(--muted)]">{p.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Benchmarks */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <SectionTitle>benchmarks.compare()</SectionTitle>
          <p className="text-[13px] text-[var(--muted)] mb-8 leading-relaxed">
            compared against CrewAI, AutoGen, LangGraph, and others.
          </p>
        </FadeIn>

        <FadeIn delay={0.05}>
          <div className="border border-[var(--border)] bg-[var(--surface)] overflow-x-auto">
            <table className="w-full text-[12px]">
              <thead>
                <tr className="border-b border-[var(--border)]">
                  <th className="text-left px-5 py-3 text-[var(--muted)] font-normal">metric</th>
                  <th className="text-left px-5 py-3 text-[var(--green)] font-normal">openfang</th>
                  <th className="text-left px-5 py-3 text-[var(--muted)] font-normal">others</th>
                </tr>
              </thead>
              <tbody>
                {BENCHMARKS.map((b) => (
                  <tr key={b.metric} className="border-b border-[var(--border)] last:border-b-0">
                    <td className="px-5 py-3 text-[var(--white)]">{b.metric}</td>
                    <td className="px-5 py-3 text-[var(--green)]">{b.openfang}</td>
                    <td className="px-5 py-3 text-[var(--muted)]">{b.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* FangHand connection */}
      <section className="px-4 py-16 max-w-6xl mx-auto w-full">
        <FadeIn>
          <div className="border border-[var(--border)] bg-[var(--surface)] px-6 py-8">
            <div className="text-[var(--white)] text-[18px] font-medium mb-4">
              fanghand runs on OpenFang
            </div>
            <div className="text-[13px] text-[var(--muted)] leading-7 mb-6">
              the fanghand marketplace is built entirely on OpenFang v0.3+.
              <br />
              every Hand you see in the marketplace is an OpenFang agent.
              <br />
              collector, researcher, twitter — all running as autonomous Hands.
            </div>
            <div className="flex flex-wrap gap-3">
              <a
                href="/"
                className="px-5 py-2.5 text-[13px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-black transition-colors duration-150 cursor-pointer"
              >
                [browse the marketplace]
              </a>
              <a
                href="https://github.com/RightNow-AI/openfang"
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-2.5 text-[13px] border border-[var(--border)] text-[var(--muted)] hover:border-[var(--border-active)] hover:text-[var(--white)] transition-colors duration-150 cursor-pointer"
              >
                [build your own Hand →]
              </a>
            </div>
          </div>
        </FadeIn>
      </section>

      <div className="border-t border-[var(--border)]" />

      {/* Footer */}
      <footer className="px-4 py-5 max-w-6xl mx-auto w-full">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] text-[var(--muted)]">
          <a
            href="https://www.openfang.sh/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--white)] transition-colors duration-150"
          >
            openfang.sh
          </a>
          <span>·</span>
          <a
            href="https://github.com/RightNow-AI/openfang"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[var(--white)] transition-colors duration-150"
          >
            github
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
          <span>14 crates · 137K lines of Rust · MIT license</span>
          <span>·</span>
          <span>built by Jaber @ RightNow AI</span>
        </div>
      </footer>
    </main>
  )
}

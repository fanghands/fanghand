import { Hero } from '@/components/Hero'
import { TokenSection } from '@/components/TokenSection'
import { AgentStatus } from '@/components/AgentStatus'
import { Findings } from '@/components/Findings'
import { VoteSection } from '@/components/VoteSection'
import { Tokenomics } from '@/components/Tokenomics'

export default function Home() {
  return (
    <main className="pb-14">
      <Hero />

      <div className="border-t border-[var(--border)]" />
      <TokenSection />

      <div className="border-t border-[var(--border)]" />
      <AgentStatus />

      <div className="border-t border-[var(--border)]" />
      <Findings />

      <div className="border-t border-[var(--border)]" />
      <VoteSection />

      <div className="border-t border-[var(--border)]" />
      <Tokenomics />

      <div className="border-t border-[var(--border)]" />
      <Footer />
    </main>
  )
}

function Footer() {
  return (
    <footer className="px-4 py-5 max-w-2xl mx-auto w-full">
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
        <span>built on OpenFang v0.3+</span>
        <span>·</span>
        <span>powered by claude sonnet</span>
        <span>·</span>
        <span className="text-[var(--muted)]">CA: 29W2v9vodb...ipump</span>
      </div>
    </footer>
  )
}

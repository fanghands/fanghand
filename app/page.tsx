import { Hero } from '@/components/Hero'
import { TokenSection } from '@/components/TokenSection'
import { AgentStatus } from '@/components/AgentStatus'
import { Findings } from '@/components/Findings'
import { VoteSection } from '@/components/VoteSection'
import { Tokenomics } from '@/components/Tokenomics'
import { MarketplacePreview } from '@/components/MarketplacePreview'
import { AnnouncementBanner } from '@/components/AnnouncementBanner'

export default function Home() {
  return (
    <main className="pb-14">
      <Hero />

      <div className="border-t border-[var(--border)]" />

      {/* Two-column grid: Token + Agents side by side on desktop */}
      <div className="px-4 py-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TokenSection />
          <AgentStatus />
        </div>
      </div>

      <div className="border-t border-[var(--border)]" />

      {/* Findings — full width */}
      <Findings />

      <div className="border-t border-[var(--border)]" />

      {/* Marketplace preview section */}
      <MarketplacePreview />

      <div className="border-t border-[var(--border)]" />

      {/* Two-column grid: Vote + Tokenomics side by side on desktop */}
      <div id="tokenomics" className="px-4 py-20 max-w-6xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VoteSection />
          <Tokenomics />
        </div>
      </div>

      <div className="border-t border-[var(--border)]" />
      <Footer />

      {/* Announcement popup */}
      <AnnouncementBanner />
    </main>
  )
}

function Footer() {
  return (
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
          href="/marketplace"
          className="hover:text-[var(--green)] transition-colors duration-150"
        >
          marketplace
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

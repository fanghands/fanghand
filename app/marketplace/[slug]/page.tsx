import { HandDetailPageContent } from '@/components/marketplace/HandDetailPage'

export function generateStaticParams() {
  return [
    { slug: 'collector-hand' },
    { slug: 'researcher-hand' },
    { slug: 'twitter-hand' },
    { slug: 'analyst-hand' },
    { slug: 'orchestrator' },
    { slug: 'hyperliquid-intel-hand' },
    { slug: 'solana-narrative-hand' },
    { slug: 'defi-yield-hand' },
  ]
}

export default function HandDetailPage() {
  return <HandDetailPageContent />
}

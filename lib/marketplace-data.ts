export interface Hand {
  id: string
  name: string
  badge: 'OFFICIAL' | 'COMMUNITY'
  category: string[]
  description: string
  features: string[]
  author: string
  installs: number
  rating: number
  price: string
  toml_preview: string
  active: boolean
  pending?: boolean
}

export const HANDS: Hand[] = [
  {
    id: 'collector-hand',
    name: 'collector-hand',
    badge: 'OFFICIAL',
    category: ['crypto', 'research'],
    description:
      'OSINT-style intelligence collector. monitors targets 24/7 with change detection, sentiment tracking, and knowledge graph construction.',
    features: ['change detection', 'sentiment tracking', 'knowledge graphs', 'critical alerts'],
    author: '@fanghandx',
    installs: 312,
    rating: 4.2,
    price: 'free',
    toml_preview: `[hand]\nname = "collector-hand"\nversion = "1.0.0"\n\n[schedule]\nfrequency = "6h"\n\n[settings]\nsources_per_cycle = 50\nsentiment = true`,
    active: true,
  },
  {
    id: 'researcher-hand',
    name: 'researcher-hand',
    badge: 'OFFICIAL',
    category: ['research'],
    description:
      'fact-checking engine. cross-references sources using the CRAAP methodology. generates cited reports with confidence scores.',
    features: ['source cross-referencing', 'CRAAP methodology', 'cited reports', 'confidence scoring'],
    author: '@fanghandx',
    installs: 289,
    rating: 4.5,
    price: 'free',
    toml_preview: `[hand]\nname = "researcher-hand"\nversion = "1.0.0"\n\n[schedule]\nfrequency = "daily"\n\n[output]\nformat = "markdown"\ncitations = true`,
    active: true,
  },
  {
    id: 'twitter-hand',
    name: 'twitter-hand',
    badge: 'OFFICIAL',
    category: ['social', 'automation'],
    description:
      'autonomous social media operator. posts 3x/day, engages with target accounts, tracks narrative shifts in the crypto/AI space.',
    features: ['scheduled posting', 'engagement automation', 'narrative tracking', 'approval mode'],
    author: '@fanghandx',
    installs: 246,
    rating: 4.0,
    price: 'free',
    toml_preview: `[hand]\nname = "twitter-hand"\nversion = "1.0.0"\n\n[schedule]\nposts_per_day = 3\n\n[settings]\napproval_mode = true\nstyle = "provocative"`,
    active: true,
  },
  {
    id: 'analyst-hand',
    name: 'analyst-hand',
    badge: 'OFFICIAL',
    category: ['research', 'crypto'],
    description:
      'synthesizes collector + researcher outputs into actionable recommendations. generates the weekly mission briefing for community vote.',
    features: ['data synthesis', 'opportunity scoring', 'risk assessment', 'vote briefing generation'],
    author: '@fanghandx',
    installs: 0,
    rating: 0,
    price: 'free',
    toml_preview: `[hand]\nname = "analyst-hand"\nversion = "0.9.0"\nstatus = "pending_activation"\n\n[dependencies]\nrequires = ["collector-hand", "researcher-hand"]`,
    active: false,
    pending: true,
  },
  {
    id: 'orchestrator',
    name: 'orchestrator',
    badge: 'OFFICIAL',
    category: ['automation'],
    description:
      'CEO Hand. coordinates all other Hands, manages task routing, resolves conflicts, and ensures mission coherence across the agent team.',
    features: ['inter-hand coordination', 'task routing', 'conflict resolution', 'mission oversight'],
    author: '@fanghandx',
    installs: 0,
    rating: 0,
    price: 'free',
    toml_preview: `[hand]\nname = "orchestrator"\nversion = "0.8.0"\nstatus = "pending_activation"\n\n[role]\ntier = "supervisor"\ncontrols = ["all"]`,
    active: false,
    pending: true,
  },
  {
    id: 'hyperliquid-intel-hand',
    name: 'hyperliquid-intel-hand',
    badge: 'COMMUNITY',
    category: ['crypto', 'research'],
    description:
      'monitors Hyperliquid ecosystem 24/7. tracks builder code volumes, new protocol deployments, and fee distribution changes.',
    features: ['builder code monitoring', 'TVL tracking', 'protocol alerts', 'fee analytics'],
    author: '@community_builder_01',
    installs: 143,
    rating: 3.9,
    price: '2 $FGH/month',
    toml_preview: `[hand]\nname = "hyperliquid-intel-hand"\nversion = "1.1.0"\n\n[schedule]\nfrequency = "1h"\n\n[targets]\nchain = "hyperliquid"\ntrack = ["builders", "tvl", "fees"]`,
    active: true,
  },
  {
    id: 'solana-narrative-hand',
    name: 'solana-narrative-hand',
    badge: 'COMMUNITY',
    category: ['crypto', 'social'],
    description:
      'tracks narrative shifts across Solana Twitter, Discord, and on-chain activity. surfaces emerging meta before it goes mainstream.',
    features: ['narrative detection', 'CT monitoring', 'on-chain correlation', 'early signal alerts'],
    author: '@community_builder_02',
    installs: 98,
    rating: 4.1,
    price: '3 $FGH/month',
    toml_preview: `[hand]\nname = "solana-narrative-hand"\nversion = "1.0.2"\n\n[schedule]\nfrequency = "2h"\n\n[sources]\nplatforms = ["twitter", "discord", "on-chain"]`,
    active: true,
  },
  {
    id: 'defi-yield-hand',
    name: 'defi-yield-hand',
    badge: 'COMMUNITY',
    category: ['crypto', 'automation'],
    description:
      'scans DeFi protocols for yield opportunities. compares APYs, assesses smart contract risk, and generates daily opportunity briefings.',
    features: ['APY scanning', 'risk scoring', 'protocol comparison', 'daily briefings'],
    author: '@community_builder_03',
    installs: 67,
    rating: 3.7,
    price: '5 $FGH/month',
    toml_preview: `[hand]\nname = "defi-yield-hand"\nversion = "0.9.1"\n\n[schedule]\nfrequency = "4h"\n\n[scope]\nchains = ["solana", "ethereum", "base"]`,
    active: true,
  },
]

export const FILTER_OPTIONS = [
  'all',
  'official',
  'community',
  'crypto',
  'research',
  'social',
  'automation',
  'free',
] as const

export type FilterOption = (typeof FILTER_OPTIONS)[number]

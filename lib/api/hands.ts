import type { Hand, HandFilter, HandReview } from '@/types/hand'
import type { PaginatedResponse } from '@/types/api'

// TODO: Replace mock data with real API calls via apiClient

const MOCK_HANDS: Hand[] = [
  {
    id: 'collector-hand',
    slug: 'collector-hand',
    name: 'collector-hand',
    emoji: '\u{1F50D}',
    badge: 'OFFICIAL',
    category: ['crypto', 'research'],
    description:
      'OSINT-style intelligence collector. monitors targets 24/7 with change detection, sentiment tracking, and knowledge graph construction.',
    features: ['change detection', 'sentiment tracking', 'knowledge graphs', 'critical alerts'],
    author: '@fanghandx',
    author_verified: true,
    version: '1.0.0',
    activations: 312,
    rating: 4.2,
    reviews_count: 47,
    price_monthly_cents: null,
    price_per_run_cents: null,
    toml_preview: `[hand]\nname = "collector-hand"\nversion = "1.0.0"\n\n[schedule]\nfrequency = "6h"\n\n[settings]\nsources_per_cycle = 50\nsentiment = true`,
    system_prompt_preview: 'You are an intelligence collector. Monitor all configured sources and detect changes, sentiment shifts, and emerging patterns.',
    settings_schema: {
      sources_per_cycle: { type: 'number', default: 50, description: 'Number of sources to scan per cycle' },
      sentiment: { type: 'boolean', default: true, description: 'Enable sentiment analysis' },
      alert_threshold: { type: 'number', default: 0.8, description: 'Confidence threshold for critical alerts' },
    },
    status: 'active',
    created_at: '2025-11-01T00:00:00Z',
    updated_at: '2026-02-15T00:00:00Z',
  },
  {
    id: 'researcher-hand',
    slug: 'researcher-hand',
    name: 'researcher-hand',
    emoji: '\u{1F4DA}',
    badge: 'OFFICIAL',
    category: ['research'],
    description:
      'fact-checking engine. cross-references sources using the CRAAP methodology. generates cited reports with confidence scores.',
    features: ['source cross-referencing', 'CRAAP methodology', 'cited reports', 'confidence scoring'],
    author: '@fanghandx',
    author_verified: true,
    version: '1.0.0',
    activations: 289,
    rating: 4.5,
    reviews_count: 38,
    price_monthly_cents: null,
    price_per_run_cents: null,
    toml_preview: `[hand]\nname = "researcher-hand"\nversion = "1.0.0"\n\n[schedule]\nfrequency = "daily"\n\n[output]\nformat = "markdown"\ncitations = true`,
    system_prompt_preview: 'You are a research analyst. Cross-reference all sources using CRAAP methodology and produce cited reports.',
    settings_schema: {
      output_format: { type: 'string', default: 'markdown', description: 'Output format (markdown or json)' },
      citations: { type: 'boolean', default: true, description: 'Include source citations' },
    },
    status: 'active',
    created_at: '2025-11-01T00:00:00Z',
    updated_at: '2026-02-10T00:00:00Z',
  },
  {
    id: 'twitter-hand',
    slug: 'twitter-hand',
    name: 'twitter-hand',
    emoji: '\u{1F426}',
    badge: 'OFFICIAL',
    category: ['social', 'automation'],
    description:
      'autonomous social media operator. posts 3x/day, engages with target accounts, tracks narrative shifts in the crypto/AI space.',
    features: ['scheduled posting', 'engagement automation', 'narrative tracking', 'approval mode'],
    author: '@fanghandx',
    author_verified: true,
    version: '1.0.0',
    activations: 246,
    rating: 4.0,
    reviews_count: 29,
    price_monthly_cents: null,
    price_per_run_cents: null,
    toml_preview: `[hand]\nname = "twitter-hand"\nversion = "1.0.0"\n\n[schedule]\nposts_per_day = 3\n\n[settings]\napproval_mode = true\nstyle = "provocative"`,
    system_prompt_preview: 'You are a social media operator. Engage authentically with the crypto/AI community.',
    settings_schema: {
      posts_per_day: { type: 'number', default: 3, description: 'Number of posts per day' },
      approval_mode: { type: 'boolean', default: true, description: 'Require approval before posting' },
      style: { type: 'string', default: 'provocative', description: 'Tone of voice' },
    },
    status: 'active',
    created_at: '2025-11-15T00:00:00Z',
    updated_at: '2026-02-20T00:00:00Z',
  },
  {
    id: 'analyst-hand',
    slug: 'analyst-hand',
    name: 'analyst-hand',
    emoji: '\u{1F4CA}',
    badge: 'OFFICIAL',
    category: ['research', 'crypto'],
    description:
      'synthesizes collector + researcher outputs into actionable recommendations. generates the weekly mission briefing for community vote.',
    features: ['data synthesis', 'opportunity scoring', 'risk assessment', 'vote briefing generation'],
    author: '@fanghandx',
    author_verified: true,
    version: '0.9.0',
    activations: 0,
    rating: 0,
    reviews_count: 0,
    price_monthly_cents: null,
    price_per_run_cents: null,
    toml_preview: `[hand]\nname = "analyst-hand"\nversion = "0.9.0"\nstatus = "pending_activation"\n\n[dependencies]\nrequires = ["collector-hand", "researcher-hand"]`,
    system_prompt_preview: null,
    settings_schema: null,
    status: 'pending',
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-01-10T00:00:00Z',
  },
  {
    id: 'orchestrator',
    slug: 'orchestrator',
    name: 'orchestrator',
    emoji: '\u{1F3AF}',
    badge: 'OFFICIAL',
    category: ['automation'],
    description:
      'CEO Hand. coordinates all other Hands, manages task routing, resolves conflicts, and ensures mission coherence across the agent team.',
    features: ['inter-hand coordination', 'task routing', 'conflict resolution', 'mission oversight'],
    author: '@fanghandx',
    author_verified: true,
    version: '0.8.0',
    activations: 0,
    rating: 0,
    reviews_count: 0,
    price_monthly_cents: null,
    price_per_run_cents: null,
    toml_preview: `[hand]\nname = "orchestrator"\nversion = "0.8.0"\nstatus = "pending_activation"\n\n[role]\ntier = "supervisor"\ncontrols = ["all"]`,
    system_prompt_preview: null,
    settings_schema: null,
    status: 'pending',
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-01-15T00:00:00Z',
  },
  {
    id: 'hyperliquid-intel-hand',
    slug: 'hyperliquid-intel-hand',
    name: 'hyperliquid-intel-hand',
    emoji: '\u{1F4A7}',
    badge: 'COMMUNITY',
    category: ['crypto', 'research'],
    description:
      'monitors Hyperliquid ecosystem 24/7. tracks builder code volumes, new protocol deployments, and fee distribution changes.',
    features: ['builder code monitoring', 'TVL tracking', 'protocol alerts', 'fee analytics'],
    author: '@community_builder_01',
    author_verified: false,
    version: '1.1.0',
    activations: 143,
    rating: 3.9,
    reviews_count: 18,
    price_monthly_cents: 500,
    price_per_run_cents: 10,
    toml_preview: `[hand]\nname = "hyperliquid-intel-hand"\nversion = "1.1.0"\n\n[schedule]\nfrequency = "1h"\n\n[targets]\nchain = "hyperliquid"\ntrack = ["builders", "tvl", "fees"]`,
    system_prompt_preview: 'Monitor all Hyperliquid on-chain activity. Track builder codes, TVL changes, and fee distributions.',
    settings_schema: {
      frequency: { type: 'string', default: '1h', description: 'How often to scan' },
      track: { type: 'string', default: 'builders,tvl,fees', description: 'Comma-separated tracking targets' },
    },
    status: 'active',
    created_at: '2025-12-01T00:00:00Z',
    updated_at: '2026-03-01T00:00:00Z',
  },
  {
    id: 'solana-narrative-hand',
    slug: 'solana-narrative-hand',
    name: 'solana-narrative-hand',
    emoji: '\u{26A1}',
    badge: 'COMMUNITY',
    category: ['crypto', 'social'],
    description:
      'tracks narrative shifts across Solana Twitter, Discord, and on-chain activity. surfaces emerging meta before it goes mainstream.',
    features: ['narrative detection', 'CT monitoring', 'on-chain correlation', 'early signal alerts'],
    author: '@community_builder_02',
    author_verified: false,
    version: '1.0.2',
    activations: 98,
    rating: 4.1,
    reviews_count: 12,
    price_monthly_cents: 700,
    price_per_run_cents: 15,
    toml_preview: `[hand]\nname = "solana-narrative-hand"\nversion = "1.0.2"\n\n[schedule]\nfrequency = "2h"\n\n[sources]\nplatforms = ["twitter", "discord", "on-chain"]`,
    system_prompt_preview: 'Track narrative shifts across Solana ecosystem. Surface emerging trends before they go mainstream.',
    settings_schema: {
      platforms: { type: 'string', default: 'twitter,discord,on-chain', description: 'Platforms to monitor' },
    },
    status: 'active',
    created_at: '2025-12-15T00:00:00Z',
    updated_at: '2026-02-28T00:00:00Z',
  },
  {
    id: 'defi-yield-hand',
    slug: 'defi-yield-hand',
    name: 'defi-yield-hand',
    emoji: '\u{1F4B0}',
    badge: 'COMMUNITY',
    category: ['crypto', 'automation'],
    description:
      'scans DeFi protocols for yield opportunities. compares APYs, assesses smart contract risk, and generates daily opportunity briefings.',
    features: ['APY scanning', 'risk scoring', 'protocol comparison', 'daily briefings'],
    author: '@community_builder_03',
    author_verified: false,
    version: '0.9.1',
    activations: 67,
    rating: 3.7,
    reviews_count: 9,
    price_monthly_cents: 1200,
    price_per_run_cents: 25,
    toml_preview: `[hand]\nname = "defi-yield-hand"\nversion = "0.9.1"\n\n[schedule]\nfrequency = "4h"\n\n[scope]\nchains = ["solana", "ethereum", "base"]`,
    system_prompt_preview: 'Scan DeFi protocols for the best yield opportunities. Assess risk and compare APYs across chains.',
    settings_schema: {
      chains: { type: 'string', default: 'solana,ethereum,base', description: 'Chains to scan' },
      min_apy: { type: 'number', default: 5, description: 'Minimum APY threshold (%)' },
    },
    status: 'active',
    created_at: '2026-01-05T00:00:00Z',
    updated_at: '2026-03-10T00:00:00Z',
  },
]

const MOCK_REVIEWS: HandReview[] = [
  {
    id: 'rev-1',
    user_address: '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
    rating: 5,
    comment: 'incredible intel quality. caught a narrative shift 12 hours before CT.',
    created_at: '2026-03-10T14:30:00Z',
  },
  {
    id: 'rev-2',
    user_address: '3Kz9bVm8aJp2LHNQrfXYiPNdR5eWvZNb8g1mToHqQxR4',
    rating: 4,
    comment: 'solid tool. would love more granular alert settings.',
    created_at: '2026-03-05T09:15:00Z',
  },
  {
    id: 'rev-3',
    user_address: '9pMx4TzVhKd6YQ8Wf2bNjRcA3oEiLsU7nXgDvHw5yZm1',
    rating: 4,
    comment: 'running this 24/7. the knowledge graphs are next level.',
    created_at: '2026-02-28T18:45:00Z',
  },
  {
    id: 'rev-4',
    user_address: 'Hk2D8jQnVxR5pYbWm3TfC7gKzAeL9iUoXs4vN6wEr1tS',
    rating: 3,
    comment: 'works well but sometimes misses smaller sources.',
    created_at: '2026-02-20T11:00:00Z',
  },
]

export async function fetchHands(
  filters?: HandFilter,
  cursor?: string | null
): Promise<PaginatedResponse<Hand>> {
  // TODO: Replace with real API call
  // return apiClient<PaginatedResponse<Hand>>(`/v1/hands?${buildQuery(filters, cursor)}`)

  await new Promise((r) => setTimeout(r, 300)) // simulate network

  let results = [...MOCK_HANDS]

  if (filters?.category && filters.category !== 'all') {
    if (filters.category === 'official') {
      results = results.filter((h) => h.badge === 'OFFICIAL')
    } else if (filters.category === 'community') {
      results = results.filter((h) => h.badge === 'COMMUNITY')
    } else if (filters.category === 'free') {
      results = results.filter((h) => h.price_monthly_cents === null)
    } else {
      results = results.filter((h) => h.category.includes(filters.category!))
    }
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase()
    results = results.filter(
      (h) =>
        h.name.toLowerCase().includes(q) ||
        h.description.toLowerCase().includes(q)
    )
  }

  if (filters?.sort === 'newest') {
    results.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
  } else if (filters?.sort === 'rating') {
    results.sort((a, b) => b.rating - a.rating)
  } else {
    results.sort((a, b) => b.activations - a.activations)
  }

  void cursor // pagination not needed for mock

  return {
    data: results,
    next_cursor: null,
    total: results.length,
  }
}

export async function fetchHandBySlug(slug: string): Promise<Hand | null> {
  // TODO: Replace with real API call
  // return apiClient<Hand>(`/v1/hands/${slug}`)

  await new Promise((r) => setTimeout(r, 200))
  return MOCK_HANDS.find((h) => h.slug === slug) || null
}

export async function fetchHandReviews(slug: string): Promise<HandReview[]> {
  // TODO: Replace with real API call
  void slug
  await new Promise((r) => setTimeout(r, 200))
  return MOCK_REVIEWS
}

export async function submitReview(
  slug: string,
  rating: number,
  comment: string
): Promise<HandReview> {
  // TODO: Replace with real API call
  void slug
  await new Promise((r) => setTimeout(r, 500))
  return {
    id: `rev-${Date.now()}`,
    user_address: 'mock_wallet_address',
    rating,
    comment,
    created_at: new Date().toISOString(),
  }
}

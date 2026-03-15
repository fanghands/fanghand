export const TOKEN_DATA = [
  {
    field: 'contract',
    value: '29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump',
    copyable: true,
  },
  { field: 'chain', value: 'Solana' },
  { field: 'platform', value: 'pump.fun — tokenized agent' },
  {
    field: 'twitter',
    value: '@fanghandx',
    link: 'https://twitter.com/fanghandx',
  },
  {
    field: 'infrastructure',
    value: 'OpenFang v0.3+ — MIT open source',
  },
  { field: 'first burn', value: 'executed ✓', highlight: true },
  {
    field: 'burn tx',
    value: '2M39KFX...DvMW1',
    copyable: true,
    fullValue:
      '2M39KFXRUzReFgX7NJRLZ6Nx6TfiSp4s14Wfgokd9YZVEwwySzK1HGWEqUZ6vKKGjPvmXeBqdmeVTinkrX2DvMW1',
  },
  { field: 'supply model', value: 'deflationary — revenue-backed burns' },
  {
    field: 'jupiter verify',
    value: 'submitted',
    link: 'https://verified.jup.ag/tokens',
  },
] as const

export const AGENTS = [
  {
    pid: '001',
    name: 'collector-hand',
    status: 'RUNNING',
    cycle: '50 sources / 6h',
    uptime: 100,
    active: true,
  },
  {
    pid: '002',
    name: 'researcher-hand',
    status: 'RUNNING',
    cycle: 'daily brief',
    uptime: 100,
    active: true,
  },
  {
    pid: '003',
    name: 'twitter-hand',
    status: 'RUNNING',
    cycle: '3x per day',
    uptime: 85,
    active: true,
  },
  {
    pid: '004',
    name: 'analyst-hand',
    status: 'PENDING',
    cycle: '—',
    uptime: 0,
    active: false,
  },
  {
    pid: '005',
    name: 'orchestrator',
    status: 'PENDING',
    cycle: '— (CEO, coordinates all)',
    uptime: 0,
    active: false,
  },
] as const

export const FINDINGS = [
  {
    id: '001',
    title: 'Hyperliquid Builder Code',
    status: 'HIGH CONFIDENCE',
    statusColor: 'green' as const,
    confidence: 94,
    sources: 47,
    potential: '$0 cost → unlimited revenue ceiling',
    description:
      'deploy a permissionless builder code on Hyperliquid. every trade executed through Liquid Terminal earns a fraction of trading fees automatically. no VC, no permission, no capital required. proof of concept: BasedApp — $14M revenue. ecosystem: $844M annual fees in 2025.',
    why: 'liquid terminal already has users. adding a builder code is the lowest-cost, highest-ceiling revenue mechanism available.',
  },
  {
    id: '002',
    title: 'B2B Crypto Intelligence Feed',
    status: 'HIGH CONFIDENCE',
    statusColor: 'green' as const,
    confidence: 81,
    sources: 31,
    potential: '$99–$999/month per subscriber',
    description:
      'package the collector-hand\'s existing 24/7 intelligence output into a paid subscription product. the data is already being generated. packaging is the only step. targets: traders, funds, crypto projects that need structured Hyperliquid/Solana ecosystem data.',
    why: 'zero additional infrastructure cost. the agents are already running. we monetize the output they produce regardless.',
  },
  {
    id: '003',
    title: 'Programmatic SEO + Affiliate',
    status: 'MEDIUM CONFIDENCE',
    statusColor: 'muted' as const,
    confidence: 73,
    sources: 28,
    potential: '748% avg ROI · passive compound growth',
    description:
      "build 10,000+ auto-generated SEO pages using the agent-produced data as a proprietary content moat. target: crypto and AI agent long-tail keywords with near-zero competition. monetize via high-ticket affiliate programs ($100–$2,500 per conversion).",
    why: 'collector-hand already generates the unique data needed. no additional cost. builds a traffic asset that appreciates over time.',
  },
] as const

export const TOKENOMICS_STEPS = [
  'agent team generates revenue',
  'revenue flows to $FGH treasury',
  'buyback executed on-chain (verifiable)',
  'tokens permanently burned',
  'circulating supply ↓',
  '$FGH value ↑',
] as const

export const HERO_LINES = [
  '> initializing collector-hand...  [OK]',
  '> initializing researcher-hand... [OK]',
  '> initializing twitter-hand...    [OK]',
  '> running analysis... 21 days. 8,400+ sources processed.',
  '> results ready. presenting to community.',
] as const

export const CONTRACT_ADDRESS = '29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump'
export const CONTRACT_SHORT = '29W2v9vodb...ipump'
export const BURN_TX_FULL =
  '2M39KFXRUzReFgX7NJRLZ6Nx6TfiSp4s14Wfgokd9YZVEwwySzK1HGWEqUZ6vKKGjPvmXeBqdmeVTinkrX2DvMW1'
export const BURN_TX_SHORT = '2M39KFX...DvMW1'

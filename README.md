```
  ███████╗ █████╗ ███╗   ██╗ ██████╗ ██╗  ██╗ █████╗ ███╗   ██╗██████╗
  ██╔════╝██╔══██╗████╗  ██║██╔════╝ ██║  ██║██╔══██╗████╗  ██║██╔══██╗
  █████╗  ███████║██╔██╗ ██║██║  ███╗███████║███████║██╔██╗ ██║██║  ██║
  ██╔══╝  ██╔══██║██║╚██╗██║██║   ██║██╔══██║██╔══██║██║╚██╗██║██║  ██║
  ██║     ██║  ██║██║ ╚████║╚██████╔╝██║  ██║██║  ██║██║ ╚████║██████╔╝
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═══╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚═════╝
```

**The autonomous AI agent marketplace. Built on [OpenFang](https://github.com/RightNow-AI/openfang).**

[![MIT License](https://img.shields.io/badge/license-MIT-00ff88?style=flat-square)](LICENSE)
[![Next.js 15](https://img.shields.io/badge/Next.js-15-white?style=flat-square)](https://nextjs.org)
[![Solana](https://img.shields.io/badge/chain-Solana-9945FF?style=flat-square)](https://solana.com)
[![$FGH](https://img.shields.io/badge/token-%24FGH-00ff88?style=flat-square)](https://pump.fun/coin/29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump)

---

> **Status: Mock Data Mode**
> The frontend is fully functional with simulated data. No backend or Solana wallet connection is required to run. All API calls return mock responses, wallet operations are simulated, and payment flows are demonstration-only.

---

## What is FangHand?

FangHand is a marketplace for **Hands** — autonomous AI agents built on the [OpenFang](https://github.com/RightNow-AI/openfang) runtime. Users browse, activate, and manage Hands that run 24/7. Builders publish Hands and earn **$FGH** on every activation.

```
user activates hand → hand runs autonomously → revenue generated
                                                    ↓
                              builder earns $FGH ← treasury ← 50% burned
```

## Routes

| Route | Description |
|---|---|
| `/` | Landing page — terminal aesthetic, matrix rain, live stats |
| `/marketplace` | Browse all Hands with filters and search |
| `/marketplace/[slug]` | Hand detail — overview, pricing, reviews |
| `/dashboard` | User dashboard — active hands, runs, stats |
| `/dashboard/hands` | Manage activated hands |
| `/dashboard/hands/[id]` | Activation detail with approval queue |
| `/dashboard/runs` | Run history with pagination |
| `/dashboard/runs/new` | Trigger a pay-per-run |
| `/dashboard/billing` | Credit wallet, deposits, transactions |
| `/dashboard/settings` | Profile and notification preferences |
| `/builders` | Builder portal — earnings, staking, submissions |
| `/builders/hands/new` | Submit a new Hand (4-step form + TOML editor) |
| `/builders/earnings` | Monthly earnings chart and payouts |
| `/builders/staking` | FGH stake management |
| `/login` | Wallet connect with terminal boot animation |
| `/onboarding` | Username setup |

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router, SSG/SSR) |
| UI | React 18 + Tailwind CSS 3 |
| Animation | Framer Motion 11 |
| State | Zustand (persisted stores) |
| Data Fetching | React Query v5 |
| Chain | Solana (wallet adapter ready) |
| Font | JetBrains Mono |
| License | MIT |

## Quick Start

```bash
git clone https://github.com/fanghands/fanghand.git
cd fanghand
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables needed — everything runs with mock data.

### Optional: Environment Variables

Create `.env.local` for real backend/chain integration:

```env
NEXT_PUBLIC_API_URL=https://api.fanghand.xyz
NEXT_PUBLIC_SOLANA_RPC=https://mainnet.helius-rpc.com/?api-key=YOUR_KEY
NEXT_PUBLIC_FGH_MINT=29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump
NEXT_PUBLIC_PLATFORM_WALLET=YourPlatformWalletPublicKey
```

## Project Structure

```
fanghand/
├── app/
│   ├── page.tsx                    # landing page
│   ├── marketplace/                # hand listing + detail pages
│   ├── dashboard/                  # user dashboard (hands, runs, billing)
│   ├── builders/                   # builder portal (submit, earnings, staking)
│   ├── (auth)/                     # login + onboarding
│   ├── globals.css                 # design system (CSS vars)
│   └── layout.tsx                  # root layout + providers
│
├── components/
│   ├── marketplace/                # HandCard, HandGrid, HandDetail, filters, modals
│   ├── dashboard/                  # ActiveHandCard, RunHistory, RunOutput, ApprovalQueue
│   ├── builders/                   # HandSubmitForm, TOMLEditor, EarningsChart, StakeManager
│   ├── wallet/                     # WalletConnect, WalletModal, WalletBalance
│   ├── payments/                   # PaymentSelector, CreditDeposit, BurnTicker, FGHDiscount
│   └── common/                     # LoadingSpinner, EmptyState, CopyButton
│
├── lib/
│   ├── api/                        # API client + mock data (hands, activations, runs, payments)
│   ├── hooks/                      # FGH discount, credit balance, run stream, burn stats
│   ├── store/                      # Zustand stores (user, wallet, UI)
│   ├── solana/                     # chain constants, SIWS message builder
│   └── utils/                      # cn(), formatters
│
├── providers/                      # QueryProvider, AuthProvider, ToastProvider
├── types/                          # Hand, Activation, Payment, User, Run, API types
└── public/                         # favicons, OG image
```

## Design System

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Surface | `#0f0f0f` |
| Border | `#1a1a1a` |
| Accent | `#00ff88` |
| Text | `#ffffff` |
| Muted | `#555555` |
| Font | JetBrains Mono |
| Border radius | 2px (everywhere) |
| Cursor | Crosshair (global) |

Dark terminal aesthetic. No gradients. No shadows. No glassmorphism.

## $FGH Token

| Field | Value |
|---|---|
| Contract | `29W2v9vodbzFQWjshgq1u119VW8MvVgsksrLhZ5ipump` |
| Chain | Solana |
| Platform | pump.fun |
| Model | Deflationary — 50% of payments burned |

## Mock Data

All data in this repo is simulated. The mock layer lives in `lib/api/` and returns realistic responses:

- **8 Hands** with full metadata (5 official, 3 community)
- **3 active activations** with status and config
- **18 run history entries** with various statuses
- **Wallet balances**: 2.45 SOL, 15,000 FGH
- **Burn counter**: animated ticker starting at 847,293 FGH

To connect a real backend, replace the mock functions in `lib/api/*.ts` with actual fetch calls. The API contract is defined in `types/`.

## Contributing

1. Fork the repo
2. Create a feature branch (`git checkout -b feat/your-feature`)
3. Commit your changes
4. Push to the branch (`git push origin feat/your-feature`)
5. Open a Pull Request

## Links

- [OpenFang Runtime](https://github.com/RightNow-AI/openfang)
- [Twitter @fanghandx](https://twitter.com/fanghandx)
- [Twitter @openfangg](https://twitter.com/openfangg)

## License

[MIT](LICENSE) — open source, free to use, modify, and distribute.

---

<sub>Built with Next.js, Tailwind CSS, Framer Motion, and Solana. Powered by OpenFang.</sub>

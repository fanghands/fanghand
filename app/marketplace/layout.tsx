import type { Metadata } from 'next'
import { QueryProvider } from '@/providers/QueryProvider'
import { AuthProvider } from '@/providers/AuthProvider'
import { ToastProvider } from '@/providers/ToastProvider'

export const metadata: Metadata = {
  title: 'FangHands Marketplace — autonomous Hands for OpenFang',
  description:
    'browse and activate autonomous AI agent Hands built by FangHand and the community. earn $FGH. agents work while you sleep.',
}

export default function MarketplaceLayout({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        <ToastProvider>
          {children}
        </ToastProvider>
      </AuthProvider>
    </QueryProvider>
  )
}

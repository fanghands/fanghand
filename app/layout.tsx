import type { Metadata } from 'next'
import { jetbrainsMono } from '@/app/fonts'
import '@/app/globals.css'
import { StatusBar } from '@/components/StatusBar'

export const metadata: Metadata = {
  title: 'FangHand Marketplace — autonomous AI hands built on OpenFang',
  description:
    'browse and activate autonomous AI agent Hands. builders earn $FGH. every activation fuels buybacks and burns.',
  openGraph: {
    title: 'FangHand Marketplace',
    description: 'autonomous AI hands built on OpenFang. activate one. it works while you sleep.',
    url: 'https://fanghand.xyz',
    siteName: 'FangHand',
    images: [{ url: '/og.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@fanghandx',
    creator: '@fanghandx',
  },
  metadataBase: new URL('https://fanghand.xyz'),
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body className="font-mono">
        {children}
        <StatusBar />
      </body>
    </html>
  )
}

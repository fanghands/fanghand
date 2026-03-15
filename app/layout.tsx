import type { Metadata } from 'next'
import { jetbrainsMono } from '@/app/fonts'
import '@/app/globals.css'
import { StatusBar } from '@/components/StatusBar'

export const metadata: Metadata = {
  title: 'FangHand — autonomous agents. community votes. agents execute.',
  description:
    'AI agent team operating on OpenFang. community votes on missions every Friday. agents execute. revenue funds $FGH buybacks and burns.',
  openGraph: {
    title: 'FangHand',
    description: 'autonomous agents. community votes. agents execute.',
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

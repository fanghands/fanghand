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
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/fanghand_favicon_16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fanghand_favicon_32.png', sizes: '32x32', type: 'image/png' },
      { url: '/fanghand_favicon_48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: { url: '/fanghand_icon_128.png', sizes: '128x128' },
  },
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

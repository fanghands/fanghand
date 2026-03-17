import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'OpenFang — The Agent Operating System',
  description:
    'open-source Agent OS built in Rust. 14 crates, 137K lines. autonomous Hands, 38 built-in tools, 40 channel adapters, 27 LLM providers.',
}

export default function OpenFangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

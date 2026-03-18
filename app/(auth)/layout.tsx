export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center font-mono">
      <div className="w-full max-w-md px-4">{children}</div>
    </div>
  )
}

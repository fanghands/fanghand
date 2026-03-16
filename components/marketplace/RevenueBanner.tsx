export function RevenueBanner() {
  return (
    <div className="px-4 max-w-6xl mx-auto w-full">
      <div className="border border-[var(--border)] bg-[var(--surface)] px-5 py-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[12px] text-[var(--muted)]">
          every Hand activation generates revenue. a % flows to $FGH treasury. builders earn. token burns.
        </span>
        <a
          href="/#tokenomics"
          className="text-[12px] text-[var(--green)] hover:text-[var(--white)] transition-colors duration-150 shrink-0"
        >
          [how it works →]
        </a>
      </div>
    </div>
  )
}

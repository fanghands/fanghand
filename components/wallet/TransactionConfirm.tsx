'use client'

import { useState } from 'react'

interface TransactionConfirmProps {
  amount: string
  recipient: string
  fee: string
  onConfirm: () => void
  onCancel: () => void
}

export function TransactionConfirm({
  amount,
  recipient,
  fee,
  onConfirm,
  onCancel,
}: TransactionConfirmProps) {
  const [loading, setLoading] = useState(false)

  const handleConfirm = async () => {
    setLoading(true)
    await new Promise((r) => setTimeout(r, 2000))
    setLoading(false)
    onConfirm()
  }

  const abbreviated = recipient.length > 8
    ? `${recipient.slice(0, 4)}...${recipient.slice(-4)}`
    : recipient

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">
        confirm transaction
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">amount</span>
          <span className="text-[var(--white)]">{amount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">to</span>
          <span className="text-[var(--white)]">{abbreviated}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-[var(--muted)]">est. fee</span>
          <span className="text-[var(--white)]">{fee}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={handleConfirm}
          disabled={loading}
          className="flex-1 border border-[var(--green)] text-[var(--green)] px-3 py-1.5 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
        >
          {loading ? (
            <span className="inline-flex items-center gap-1">
              <span className="animate-spin">|</span> confirming...
            </span>
          ) : (
            '[confirm]'
          )}
        </button>
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 border border-[var(--muted-2)] text-[var(--muted)] px-3 py-1.5 hover:border-[var(--muted)] transition-all duration-150 disabled:opacity-50"
        >
          [cancel]
        </button>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

export function CreditWalletDeposit() {
  const [step, setStep] = useState(1)
  const [amount, setAmount] = useState('')
  const [balance, setBalance] = useState(12.5)

  const handleDeposit = () => {
    setStep(2)
    setTimeout(() => {
      const num = parseFloat(amount) || 0
      setBalance((b) => b + num * 150) // mock SOL->USD
      setStep(3)
    }, 2000)
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">
        deposit SOL to credit wallet
      </div>

      {step === 1 && (
        <div className="space-y-3">
          <div>
            <label className="text-[var(--muted)] block mb-1">amount (SOL)</label>
            <input
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] font-mono text-[12px] focus:border-[var(--green)] focus:outline-none"
            />
          </div>
          {amount && parseFloat(amount) > 0 && (
            <div className="text-[var(--muted)]">
              ≈ ${(parseFloat(amount) * 150).toFixed(2)} USD credit
            </div>
          )}
          <button
            onClick={handleDeposit}
            disabled={!amount || parseFloat(amount) <= 0}
            className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150 disabled:opacity-50"
          >
            [deposit]
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="text-[var(--amber)] flex items-center gap-2">
          <span className="animate-spin">|</span> confirming transaction...
        </div>
      )}

      {step === 3 && (
        <div className="space-y-2">
          <div className="text-[var(--green)]">[ok] deposit confirmed</div>
          <div className="flex justify-between">
            <span className="text-[var(--muted)]">new balance</span>
            <span className="text-[var(--green)]">${balance.toFixed(2)}</span>
          </div>
          <button
            onClick={() => {
              setStep(1)
              setAmount('')
            }}
            className="border border-[var(--border)] text-[var(--muted)] px-3 py-1.5 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
          >
            [deposit more]
          </button>
        </div>
      )}
    </div>
  )
}

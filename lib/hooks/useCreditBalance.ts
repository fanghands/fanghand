'use client'

import { useState } from 'react'

export function useCreditBalance() {
  const [balance, setBalance] = useState(12.5)
  const deposit = (amount: number) => setBalance((b) => b + amount)
  return { balance, deposit }
}

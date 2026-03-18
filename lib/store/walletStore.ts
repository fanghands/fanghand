'use client'

import { create } from 'zustand'

interface WalletState {
  solBalance: number
  fghBalance: number
  setSolBalance: (balance: number) => void
  setFGHBalance: (balance: number) => void
}

export const useWalletStore = create<WalletState>()((set) => ({
  solBalance: 0,
  fghBalance: 0,
  setSolBalance: (solBalance) => set({ solBalance }),
  setFGHBalance: (fghBalance) => set({ fghBalance }),
}))

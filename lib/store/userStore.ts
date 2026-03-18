'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/types/user'

interface UserState {
  user: User | null
  token: string | null
  isAuthenticated: boolean
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  signOut: () => void
  hydrateFromStorage: () => void
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      signOut: () => set({ user: null, token: null, isAuthenticated: false }),
      hydrateFromStorage: () => {
        // persist middleware handles this automatically
      },
    }),
    {
      name: 'fanghand-user',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
)

'use client'

import { create } from 'zustand'

interface UIState {
  sidebarOpen: boolean
  activeModal: string | null
  toggleSidebar: () => void
  setActiveModal: (modal: string | null) => void
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: false,
  activeModal: null,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setActiveModal: (activeModal) => set({ activeModal }),
}))

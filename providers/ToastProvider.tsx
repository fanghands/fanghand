'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

interface ToastContextValue {
  addToast: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextValue>({
  addToast: () => {},
})

export function useToast() {
  return useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`
    setToasts((prev) => [...prev, { id, message, type }])

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const getColor = (type: Toast['type']) => {
    switch (type) {
      case 'success':
        return 'var(--green)'
      case 'error':
        return 'var(--red)'
      default:
        return 'var(--muted)'
    }
  }

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-12 right-4 z-[200] flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.2 }}
              onClick={() => removeToast(toast.id)}
              className="border bg-[var(--bg)] px-4 py-2 text-[12px] font-mono cursor-crosshair max-w-[320px]"
              style={{ borderColor: getColor(toast.type), color: getColor(toast.type) }}
            >
              {toast.type === 'success' && '> '}
              {toast.type === 'error' && '! '}
              {toast.type === 'info' && '~ '}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

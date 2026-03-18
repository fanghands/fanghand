'use client'

import { useEffect, useState } from 'react'

export function useBurnStats() {
  const [totalBurned, setTotalBurned] = useState(2_847_192)
  const [lastBurn, setLastBurn] = useState({ amount: 1250, ago: '2m ago' })

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalBurned((prev) => prev + Math.floor(Math.random() * 5 + 1))
      setLastBurn({ amount: Math.floor(Math.random() * 500 + 100), ago: 'just now' })
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return { totalBurned, lastBurn }
}

'use client'

import { useEffect, useState, useCallback } from 'react'

const MOCK_LINES = [
  '> initializing hand runtime...',
  '> loading agent config from TOML...',
  '> connecting to data sources...',
  '> [ok] data source: twitter_api',
  '> [ok] data source: web_scraper',
  '> executing primary task...',
  '> processing batch 1/3...',
  '> processing batch 2/3...',
  '> processing batch 3/3...',
  '> aggregating results...',
  '> formatting output...',
  '> [done] run completed successfully',
  '> total tokens used: 12,847',
  '> cost: $0.42',
]

export function useRunStream() {
  const [lines, setLines] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)

  const startStream = useCallback(() => {
    setLines([])
    setIsStreaming(true)
  }, [])

  useEffect(() => {
    if (!isStreaming) return
    let idx = 0
    const interval = setInterval(() => {
      if (idx < MOCK_LINES.length) {
        setLines((prev) => [...prev, MOCK_LINES[idx]])
        idx++
      } else {
        setIsStreaming(false)
        clearInterval(interval)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isStreaming])

  return { lines, isStreaming, startStream }
}

'use client'

import { useEffect, useState, useCallback } from 'react'
import { getRunOutputStreamUrl } from '@/lib/api/runs'

export function useRunStream(runId?: string) {
  const [lines, setLines] = useState<string[]>([])
  const [isStreaming, setIsStreaming] = useState(false)

  const startStream = useCallback(() => {
    if (!runId) {
      // Demo mode: simulate output when no runId
      setLines([])
      setIsStreaming(true)
      return
    }
    setLines([])
    setIsStreaming(true)
  }, [runId])

  useEffect(() => {
    if (!isStreaming) return

    // If we have a real runId, connect to SSE
    if (runId) {
      const url = getRunOutputStreamUrl(runId)
      const source = new EventSource(url)

      source.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.type === 'output' && data.content) {
            setLines((prev) => [...prev, data.content])
          }
          if (data.type === 'done') {
            setIsStreaming(false)
            source.close()
          }
        } catch {
          setLines((prev) => [...prev, event.data])
        }
      }

      source.onerror = () => {
        setIsStreaming(false)
        source.close()
      }

      return () => source.close()
    }

    // Fallback: demo mode with simulated lines
    const DEMO_LINES = [
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
    let idx = 0
    const interval = setInterval(() => {
      if (idx < DEMO_LINES.length) {
        setLines((prev) => [...prev, DEMO_LINES[idx]])
        idx++
      } else {
        setIsStreaming(false)
        clearInterval(interval)
      }
    }, 500)
    return () => clearInterval(interval)
  }, [isStreaming, runId])

  return { lines, isStreaming, startStream }
}

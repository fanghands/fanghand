'use client'

import { useState, useCallback } from 'react'

interface SettingsSchema {
  [key: string]: {
    type: string
    default: unknown
    description: string
  }
}

interface HandConfigFormProps {
  schema: SettingsSchema
  onSubmit: (config: Record<string, unknown>) => void
}

export function HandConfigForm({ schema, onSubmit }: HandConfigFormProps) {
  const [config, setConfig] = useState<Record<string, unknown>>(() => {
    const defaults: Record<string, unknown> = {}
    Object.entries(schema).forEach(([key, field]) => {
      defaults[key] = field.default
    })
    return defaults
  })

  const handleChange = useCallback((key: string, value: unknown) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault()
      onSubmit(config)
    },
    [config, onSubmit]
  )

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(schema).map(([key, field]) => (
        <div key={key}>
          <label className="block text-[11px] text-[var(--muted)] mb-1 font-mono">
            {key}
            <span className="text-[var(--muted-2)] ml-2">({field.type})</span>
          </label>
          <div className="text-[10px] text-[var(--muted-2)] mb-2">{field.description}</div>

          {field.type === 'boolean' ? (
            <button
              type="button"
              onClick={() => handleChange(key, !config[key])}
              className={`px-3 py-1.5 text-[12px] border transition-colors duration-150 cursor-crosshair ${
                config[key]
                  ? 'border-[var(--green)] text-[var(--green)]'
                  : 'border-[var(--border)] text-[var(--muted)]'
              }`}
            >
              {config[key] ? '[enabled]' : '[disabled]'}
            </button>
          ) : field.type === 'number' ? (
            <input
              type="number"
              value={String(config[key] ?? '')}
              onChange={(e) => handleChange(key, Number(e.target.value))}
              className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--white)] text-[12px] px-3 py-2 font-mono focus:border-[var(--green)] focus:outline-none transition-colors duration-150"
            />
          ) : (
            <input
              type="text"
              value={String(config[key] ?? '')}
              onChange={(e) => handleChange(key, e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--border)] text-[var(--white)] text-[12px] px-3 py-2 font-mono focus:border-[var(--green)] focus:outline-none transition-colors duration-150"
            />
          )}
        </div>
      ))}

      <button
        type="submit"
        className="w-full px-4 py-2 text-[12px] border border-[var(--green)] text-[var(--green)] hover:bg-[var(--green)] hover:text-[var(--bg)] transition-colors duration-150 cursor-crosshair font-mono"
      >
        [confirm configuration]
      </button>
    </form>
  )
}

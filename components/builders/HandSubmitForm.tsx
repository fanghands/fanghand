'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { TOMLEditor } from './TOMLEditor'

const CATEGORIES = ['defi', 'social', 'data', 'trading', 'content', 'utility']

const DEFAULT_TOML = `[hand]
name = ""
version = "1.0.0"
description = ""

[pricing]
monthly = 29.00
per_run = 1.20

[agent]
model = "claude-sonnet"
max_tokens = 4096

[tools]
allowed = ["web_search", "api_call"]
`

interface FormData {
  name: string
  description: string
  category: string
  monthlyPrice: string
  perRunPrice: string
  toml: string
  skillMd: string
  systemPrompt: string
}

export function HandSubmitForm() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormData>({
    name: '',
    description: '',
    category: CATEGORIES[0],
    monthlyPrice: '29.00',
    perRunPrice: '1.20',
    toml: DEFAULT_TOML,
    skillMd: '',
    systemPrompt: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }))

  const steps = ['basic info', 'TOML config', 'upload files', 'review + submit']

  return (
    <div className="font-mono text-[12px]">
      {/* Step indicators */}
      <div className="flex gap-1 mb-6">
        {steps.map((s, i) => (
          <div
            key={s}
            className={`flex-1 text-center py-2 border-b-2 transition-all duration-150 ${
              i + 1 === step
                ? 'border-[var(--green)] text-[var(--green)]'
                : i + 1 < step
                  ? 'border-[var(--muted)] text-[var(--muted)]'
                  : 'border-[var(--border)] text-[var(--muted-2)]'
            }`}
          >
            {i + 1}. {s}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="text-[var(--muted)] block mb-1">hand name</label>
              <input
                value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
              />
            </div>
            <div>
              <label className="text-[var(--muted)] block mb-1">description</label>
              <textarea
                value={form.description}
                onChange={(e) => update('description', e.target.value)}
                rows={3}
                className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="text-[var(--muted)] block mb-1">category</label>
              <select
                value={form.category}
                onChange={(e) => update('category', e.target.value)}
                className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[var(--muted)] block mb-1">monthly price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.monthlyPrice}
                  onChange={(e) => update('monthlyPrice', e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[var(--muted)] block mb-1">per-run price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.perRunPrice}
                  onChange={(e) => update('perRunPrice', e.target.value)}
                  className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
                />
              </div>
            </div>
            <button
              onClick={() => setStep(2)}
              className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
            >
              [next: TOML config →]
            </button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <TOMLEditor value={form.toml} onChange={(v) => update('toml', v)} />
            <div className="flex gap-2">
              <button
                onClick={() => setStep(1)}
                className="border border-[var(--border)] text-[var(--muted)] px-4 py-2 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
              >
                [← back]
              </button>
              <button
                onClick={() => setStep(3)}
                className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [next: upload files →]
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div>
              <label className="text-[var(--muted)] block mb-1">SKILL.md content</label>
              <textarea
                value={form.skillMd}
                onChange={(e) => update('skillMd', e.target.value)}
                rows={6}
                placeholder="# Skill description..."
                className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] font-mono focus:border-[var(--green)] focus:outline-none resize-y"
              />
            </div>
            <div>
              <label className="text-[var(--muted)] block mb-1">system-prompt.md content</label>
              <textarea
                value={form.systemPrompt}
                onChange={(e) => update('systemPrompt', e.target.value)}
                rows={6}
                placeholder="You are an agent that..."
                className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] font-mono focus:border-[var(--green)] focus:outline-none resize-y"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(2)}
                className="border border-[var(--border)] text-[var(--muted)] px-4 py-2 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
              >
                [← back]
              </button>
              <button
                onClick={() => setStep(4)}
                className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [next: review →]
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && !submitted && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-4"
          >
            <div className="border border-[var(--border)] bg-[var(--surface)] p-4 space-y-2">
              <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-2">
                review submission
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">name</span>
                <span>{form.name || '(unnamed)'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">category</span>
                <span>{form.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">monthly</span>
                <span>${form.monthlyPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--muted)]">per-run</span>
                <span>${form.perRunPrice}</span>
              </div>
            </div>
            <div className="border border-[var(--amber)] bg-[var(--surface)] p-3 text-[var(--amber)]">
              stake required: 1,000 FGH (locked for 30 days)
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setStep(3)}
                className="border border-[var(--border)] text-[var(--muted)] px-4 py-2 hover:border-[var(--green)] hover:text-[var(--green)] transition-all duration-150"
              >
                [← back]
              </button>
              <button
                onClick={() => setSubmitted(true)}
                className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [submit hand]
              </button>
            </div>
          </motion.div>
        )}

        {submitted && (
          <motion.div
            key="submitted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="border border-[var(--green)] bg-[var(--surface)] p-6 text-center"
          >
            <div className="text-[var(--green)] text-[16px] mb-2">[ok] hand submitted</div>
            <div className="text-[var(--muted)]">
              your hand is now under review. you will be notified when it is approved.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

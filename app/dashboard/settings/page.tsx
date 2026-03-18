'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function SettingsPage() {
  const [username, setUsername] = useState('anon_user_42')
  const [email, setEmail] = useState('')
  const [notifications, setNotifications] = useState({
    runComplete: true,
    runFailed: true,
    approvalNeeded: true,
    billing: false,
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 max-w-lg">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px]">
        settings
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }} className="space-y-6">
        {/* Profile */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] space-y-3">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2">profile</div>
          <div>
            <label className="text-[var(--muted)] block mb-1">username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[var(--muted)] block mb-1">email (optional)</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] space-y-3">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2">
            notifications
          </div>
          {Object.entries(notifications).map(([key, val]) => (
            <label key={key} className="flex items-center justify-between">
              <span className="text-[var(--muted)]">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
              <button
                onClick={() => setNotifications((n) => ({ ...n, [key]: !val }))}
                className={`border px-2 py-0.5 transition-all duration-150 ${
                  val
                    ? 'border-[var(--green)] text-[var(--green)]'
                    : 'border-[var(--border)] text-[var(--muted)]'
                }`}
              >
                {val ? '[on]' : '[off]'}
              </button>
            </label>
          ))}
        </div>

        {/* API Keys */}
        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px]">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">
            API keys
          </div>
          <div className="text-[var(--muted-2)]">
            API key management coming soon
          </div>
        </div>

        {/* Save */}
        <button
          onClick={handleSave}
          className="border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
        >
          {saved ? '[saved]' : '[save]'}
        </button>
      </motion.div>
    </div>
  )
}

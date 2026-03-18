'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function OnboardingPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [bio, setBio] = useState('')

  const handleContinue = () => {
    router.push('/dashboard')
  }

  return (
    <div className="border border-[var(--border)] bg-[var(--surface)] p-6 font-mono text-[12px]">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-4">
        setup your profile
      </div>
      <div className="space-y-4">
        <div>
          <label className="text-[var(--muted)] block mb-1">username</label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="anon_user"
            className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none"
          />
        </div>
        <div>
          <label className="text-[var(--muted)] block mb-1">bio (optional)</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            placeholder="tell us about yourself..."
            className="w-full bg-[var(--bg)] border border-[var(--border)] px-3 py-2 text-[var(--white)] focus:border-[var(--green)] focus:outline-none resize-y"
          />
        </div>
        <button
          onClick={handleContinue}
          className="w-full border border-[var(--green)] text-[var(--green)] px-4 py-2 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
        >
          [continue to dashboard →]
        </button>
      </div>
    </div>
  )
}

'use client'

import { HandSubmitForm } from '@/components/builders/HandSubmitForm'

export default function NewHandPage() {
  return (
    <div className="max-w-2xl">
      <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 text-[12px] mb-6">
        submit new hand
      </div>
      <HandSubmitForm />
    </div>
  )
}

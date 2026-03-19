'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { HandStatusBadge } from '@/components/dashboard/HandStatusBadge'
import { RunHistoryTable } from '@/components/dashboard/RunHistoryTable'
import { ApprovalQueue } from '@/components/dashboard/ApprovalQueue'
import { fetchActivation, pauseActivation, resumeActivation, cancelActivation } from '@/lib/api/activations'

interface Props {
  activationId?: string
}

export function ActivationDetail({ activationId }: Props) {
  const queryClient = useQueryClient()

  const { data: activation } = useQuery({
    queryKey: ['activation', activationId],
    queryFn: () => fetchActivation(activationId!),
    enabled: !!activationId,
  })

  const pauseMutation = useMutation({
    mutationFn: () => pauseActivation(activationId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activation', activationId] }),
  })

  const resumeMutation = useMutation({
    mutationFn: () => resumeActivation(activationId!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['activation', activationId] }),
  })

  const status = activation?.status as 'active' | 'paused' | 'error' | 'expired' | undefined
  const config = (activation as any)?.config || {}

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} viewport={{ once: true }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-[16px] text-[var(--white)]">{(activation as any)?.hand_name || 'Loading...'}</span>
            {status && <HandStatusBadge status={status} />}
          </div>
          <div className="flex gap-2 text-[12px]">
            {status === 'active' ? (
              <button
                onClick={() => pauseMutation.mutate()}
                className="border border-[var(--amber)] text-[var(--amber)] px-3 py-1 hover:bg-[var(--amber)] hover:text-black transition-all duration-150"
              >
                [pause]
              </button>
            ) : status === 'paused' ? (
              <button
                onClick={() => resumeMutation.mutate()}
                className="border border-[var(--green)] text-[var(--green)] px-3 py-1 hover:bg-[var(--green)] hover:text-black transition-all duration-150"
              >
                [resume]
              </button>
            ) : null}
          </div>
        </div>

        <div className="border border-[var(--border)] bg-[var(--surface)] p-4 font-mono text-[12px] mb-6">
          <div className="text-[var(--muted)] border-b border-[var(--border)] pb-2 mb-3">configuration</div>
          <div className="space-y-1">
            {Object.entries(config).map(([key, value]) => (
              <div key={key} className="flex justify-between">
                <span className="text-[var(--muted)]">{key}</span>
                <span>{String(value)}</span>
              </div>
            ))}
            {Object.keys(config).length === 0 && (
              <div className="text-[var(--muted)]">default configuration</div>
            )}
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <ApprovalQueue />
      </motion.div>
    </div>
  )
}

'use client'

import { ActivationDetail } from '@/components/dashboard/ActivationDetail'

export function ActivationDetailWrapper({ activationId }: { activationId: string }) {
  return <ActivationDetail activationId={activationId} />
}

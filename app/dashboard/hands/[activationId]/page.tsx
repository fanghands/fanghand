import { ActivationDetail } from '@/components/dashboard/ActivationDetail'

export function generateStaticParams() {
  return [
    { activationId: 'act-1' },
    { activationId: 'act-2' },
    { activationId: 'act-3' },
  ]
}

export default function ActivationDetailPage() {
  return <ActivationDetail />
}

import { ActivationDetailWrapper } from './ActivationDetailWrapper'

export function generateStaticParams() {
  return [
    { activationId: 'act-1' },
    { activationId: 'act-2' },
    { activationId: 'act-3' },
  ]
}

export default async function ActivationDetailPage({ params }: { params: Promise<{ activationId: string }> }) {
  const { activationId } = await params
  return <ActivationDetailWrapper activationId={activationId} />
}

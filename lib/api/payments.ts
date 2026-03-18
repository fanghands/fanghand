import type { CreditBalance, PaymentSession } from '@/types/payment'

// TODO: Replace all mock data with real API calls

export async function createStripeSession(
  token: string,
  params: { amount_cents: number; hand_id: string }
): Promise<{ checkout_url: string }> {
  // TODO: return apiClient('/v1/payments/stripe', { token, method: 'POST', body: JSON.stringify(params) })
  void token
  void params
  await new Promise((r) => setTimeout(r, 500))
  return { checkout_url: 'https://checkout.stripe.com/mock-session' }
}

export async function depositCredit(
  token: string,
  txSignature: string,
  lamports: number
): Promise<CreditBalance> {
  // TODO: return apiClient('/v1/payments/deposit', { token, method: 'POST', body: JSON.stringify({ tx_signature: txSignature, lamports }) })
  void token
  void txSignature
  await new Promise((r) => setTimeout(r, 600))
  return { lamports, usd_equivalent: (lamports / 1_000_000_000) * 150 }
}

export async function getCreditBalance(
  token: string
): Promise<CreditBalance> {
  // TODO: return apiClient('/v1/payments/balance', { token })
  void token
  await new Promise((r) => setTimeout(r, 200))
  return { lamports: 500_000_000, usd_equivalent: 75.0 }
}

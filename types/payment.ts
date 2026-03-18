export type PaymentMethod = 'stripe_card' | 'sol' | 'fgh' | 'usdc' | 'credit_wallet'

export interface CreditBalance {
  lamports: number
  usd_equivalent: number
}

export interface PaymentSession {
  id: string
  method: PaymentMethod
  amount_cents: number
  status: 'pending' | 'completed' | 'failed'
  tx_signature?: string
}

export function buildSIWSMessage({
  domain,
  address,
  statement,
  nonce,
}: {
  domain: string
  address: string
  statement: string
  nonce: string
}): string {
  const now = new Date().toISOString()
  return [
    `${domain} wants you to sign in with your Solana account:`,
    address,
    '',
    statement,
    '',
    `URI: https://${domain}`,
    `Version: 1`,
    `Nonce: ${nonce}`,
    `Issued At: ${now}`,
  ].join('\n')
}

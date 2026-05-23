// frontend/components/shared/WalletButton.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Displays wallet connection button with user's shortened address

'use client'

import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import { shortenAddress } from '@/lib/jupiter'

export function WalletButton() {
  const { publicKey } = useWallet()

  return (
    <div className="flex items-center gap-3">
      {publicKey && (
        <div className="text-ash-300 font-mono text-sm">
          {shortenAddress(publicKey.toString())}
        </div>
      )}
      <WalletMultiButton />
    </div>
  )
}

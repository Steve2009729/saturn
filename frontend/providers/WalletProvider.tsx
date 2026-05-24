// frontend/providers/WalletProvider.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Wraps entire app with Solana wallet adapter
// Allows users to connect Phantom, Solflare, Backpack, Trust Wallet, Coinbase
// MUST be inside QueryProvider wrapper
// Auto-reconnects to last used wallet on page refresh

'use client'

import React, { useMemo } from 'react'
import {
  ConnectionProvider,
  WalletProvider as SolanaWalletProvider
} from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  TrustWalletAdapter,
} from '@solana/wallet-adapter-wallets'

const HELIUS_RPC = process.env.NEXT_PUBLIC_HELIUS_RPC_URL!

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(() => HELIUS_RPC, [])

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new BackpackWalletAdapter(),
      new TrustWalletAdapter(),
      new CoinbaseWalletAdapter(),
    ],
    []
  )

  return (
    <ConnectionProvider endpoint={endpoint}>
      <SolanaWalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </SolanaWalletProvider>
    </ConnectionProvider>
  )
}

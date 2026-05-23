// frontend/components/terminal/WalletPanel.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Display connected wallet portfolio
// Shows: total value, token holdings with balances and values

'use client'

import { useQuery } from '@tanstack/react-query'
import { useWallet } from '@solana/wallet-adapter-react'
import { fetchWalletHoldings } from '@/lib/birdeye'
import { formatPrice } from '@/lib/jupiter'
import { Wallet } from 'lucide-react'

export function WalletPanel() {
  const { publicKey } = useWallet()

  const { data: holdings = [], isLoading } = useQuery({
    queryKey: ['walletHoldings', publicKey?.toString()],
    queryFn: () => fetchWalletHoldings(publicKey!.toString()),
    enabled: !!publicKey,
    refetchInterval: 10000,
  })

  const totalValue = holdings.reduce((sum, h) => sum + (h.valueUsd || 0), 0)

  return (
    <div className="panel h-full">
      <div className="panel-header flex items-center gap-2">
        <Wallet className="w-4 h-4 text-saturn-gold" />
        Portfolio
      </div>

      <div className="panel-content p-4">
        {!publicKey ? (
          <div className="flex items-center justify-center h-32 text-ash-400">
            Connect wallet to view portfolio
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            {/* Total Value */}
            <div className="bg-saturn-gold/10 rounded-lg p-4 mb-4 border border-saturn-gold/30">
              <div className="text-xs text-ash-400 mb-1">Total Portfolio Value</div>
              <div className="font-display text-2xl text-saturn-gold">
                {formatPrice(totalValue)}
              </div>
            </div>

            {/* Holdings */}
            <div className="space-y-2">
              {holdings.length === 0 ? (
                <div className="text-ash-400 text-center py-4 text-sm">
                  No token holdings
                </div>
              ) : (
                holdings.slice(0, 10).map((holding) => (
                  <div
                    key={holding.mint}
                    className="bg-ash-800/50 rounded-lg p-3 border border-ash-700"
                  >
                    <div className="flex justify-between mb-1">
                      <div className="font-mono text-sm text-saturn-gold">
                        {holding.symbol}
                      </div>
                      <div className="font-mono text-sm text-ash-100">
                        {formatPrice(holding.valueUsd)}
                      </div>
                    </div>
                    <div className="text-xs text-ash-400">
                      {holding.uiAmount.toFixed(4)} {holding.symbol}
                    </div>
                  </div>
                ))
              )}
            </div>

            {holdings.length > 10 && (
              <div className="text-xs text-ash-400 text-center mt-4">
                +{holdings.length - 10} more
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

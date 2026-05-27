// frontend/components/terminal/ActivityFeed.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Show recent buy/sell transactions for selected token
// Updates every 10 seconds with latest trades

'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchTokenTrades } from '@/lib/birdeye'
import { formatPrice, shortenAddress } from '@/lib/jupiter'
import type { TokenMarketData } from '@/types'
import { Activity, TrendingUp, TrendingDown } from 'lucide-react'

export function ActivityFeed({ token }: { token: TokenMarketData | null }) {
  const { data: trades = [], isLoading } = useQuery({
    queryKey: ['tokenTrades', token?.address],
    queryFn: () => fetchTokenTrades(token!.address, 30),
    enabled: !!token,
    refetchInterval: 10000,
  })

  if (!token) {
    return (
      <div className="panel">
        <div className="panel-header flex items-center gap-2">
          <Activity className="w-4 h-4 text-saturn-gold" />
          Activity
        </div>
        <div className="flex items-center justify-center h-full text-ash-400">
          Select a token to see activity
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-header flex items-center gap-2">
        <Activity className="w-4 h-4 text-saturn-gold" />
        Activity
      </div>

      <div className="panel-content">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="spinner"></div>
          </div>
        ) : trades.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-ash-400">
            No recent activity
          </div>
        ) : (
          <div className="space-y-1">
            {trades.map((trade: any, idx: number) => {
              const isBuy = trade.txType === 'buy'
              const amount = parseFloat(trade.tokenAmount) || 0
              const price = parseFloat(trade.tokenPrice) || 0
              const value = amount * price

              return (
                <div
                  key={idx}
                  className="px-3 py-2 border-b border-ash-700 hover:bg-ash-800/30 transition-colors text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      {isBuy ? (
                        <div className="bg-saturn-green/20 text-saturn-green px-2 py-1 rounded flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          BUY
                        </div>
                      ) : (
                        <div className="bg-saturn-red/20 text-saturn-red px-2 py-1 rounded flex items-center gap-1">
                          <TrendingDown className="w-3 h-3" />
                          SELL
                        </div>
                      )}
                    </div>

                    <div className="font-mono text-ash-100">
                      {formatPrice(value)}
                    </div>
                  </div>

                  <div className="flex justify-between text-ash-400">
                    <span className="font-mono">
                      {shortenAddress(trade.user || 'Unknown')}
                    </span>

                    <span className="font-mono">
                      {new Date(
                        trade.blockUnixTime * 1000
                      ).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

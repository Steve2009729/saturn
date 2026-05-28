// frontend/components/terminal/TokenFeed.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Live list of trending Solana tokens
// Updates every 5 seconds with: symbol, volume, price, 24h change

'use client'

import { useQuery } from '@tanstack/react-query'
import { fetchTrendingTokens } from '@/lib/dexscreener'
import { formatPrice, formatChange } from '@/lib/jupiter'
import { formatVolume } from '@/lib/dexscreener'
import type { TokenMarketData } from '@/types'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { useState } from 'react'

export function TokenFeed({
  onSelectToken,
}: {
  onSelectToken: (token: TokenMarketData) => void
}) {
  const [filterType, setFilterType] = useState<'trending' | 'gainers' | 'losers'>('trending')

  const { data: allTokens = [] } = useQuery({
    queryKey: ['trendingTokens'],
    queryFn: fetchTrendingTokens,
    refetchInterval: 5000, // Update every 5 seconds
  })

  // Filter tokens based on selected type
  const filteredTokens = allTokens
    .filter(token => {
      const change = token.priceChange.h24 || 0
      if (filterType === 'gainers') return change > 0
      if (filterType === 'losers') return change < 0
      return true
    })
    .sort((a, b) => {
      const aChange = parseFloat(a.priceChange.h24) || 0
      const bChange = parseFloat(b.priceChange.h24) || 0
      if (filterType === 'trending') return (b.volume?.h24 || 0) - (a.volume?.h24 || 0)
      if (filterType === 'gainers') return bChange - aChange
      return aChange - bChange
    })
    .slice(0, 50)

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <span>Token Feed</span>
        <div className="flex gap-2">
          {(['trending', 'gainers', 'losers'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1 rounded text-xs font-mono transition-all ${
                filterType === type
                  ? 'bg-saturn-gold text-ash-950'
                  : 'bg-ash-700 text-ash-300 hover:bg-ash-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="panel-content">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-ash-800">
            <tr>
              <th className="text-left px-2 py-2 text-ash-400 font-mono">Symbol</th>
              <th className="text-right px-2 py-2 text-ash-400 font-mono">Vol (24h)</th>
              <th className="text-right px-2 py-2 text-ash-400 font-mono">Price</th>
              <th className="text-right px-2 py-2 text-ash-400 font-mono">24h %</th>
            </tr>
          </thead>
          <tbody>
            {filteredTokens.map((token, idx) => {
              const change = parseFloat(token.priceChange.h24) || 0
              const isPositive = change >= 0

              return (
                <tr
                  key={token.address}
                  onClick={() => onSelectToken(token)}
                  className="hover:bg-ash-800/50 cursor-pointer transition-colors border-b border-ash-700"
                >
                  <td className="px-2 py-2">
                    <div className="font-mono text-saturn-gold font-bold">
                      {idx + 1}. {token.symbol}
                    </div>
                  </td>
                  <td className="px-2 py-2 text-right font-mono text-ash-300">
                    {formatVolume(token.volume?.h24 || 0)}
                  </td>
                  <td className="px-2 py-2 text-right font-mono text-ash-100">
                    {formatPrice(parseFloat(token.priceUsd))}
                  </td>
                  <td className={`px-2 py-2 text-right font-mono font-bold ${
                    isPositive ? 'text-saturn-green' : 'text-saturn-red'
                  }`}>
                    <div className="flex items-center justify-end gap-1">
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      {formatChange(change)}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// frontend/components/terminal/AISignalPanel.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Display AI trading signals from Claude
// Backend analyzes token and returns BUY/SELL/HOLD signal

'use client'

import { useQuery } from '@tanstack/react-query'
import { BACKEND_URL } from '@/lib/constants'
import type { TokenMarketData, AISignal } from '@/types'
import { Brain, TrendingUp, TrendingDown } from 'lucide-react'
import axios from 'axios'

async function fetchSignal(token: TokenMarketData): Promise<AISignal> {
  const response = await axios.post(`${BACKEND_URL}/api/signal`, {
    tokenName: token.symbol,
    tokenSymbol: token.symbol,
    tokenAddress: token.address,
  })
  return response.data.data
}

export function AISignalPanel({ token }: { token: TokenMarketData | null }) {
  const { data: signal, isLoading, error } = useQuery({
    queryKey: ['signal', token?.address],
    queryFn: () => fetchSignal(token!),
    enabled: !!token,
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  if (!token) {
    return (
      <div className="panel">
        <div className="panel-header flex items-center gap-2">
          <Brain className="w-4 h-4 text-saturn-purple" />
          AI Signal
        </div>
        <div className="flex items-center justify-center h-full text-ash-400">
          Select a token to see signals
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-header flex items-center gap-2">
        <Brain className="w-4 h-4 text-saturn-purple" />
        AI Signal
      </div>

      <div className="panel-content p-4 space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-32">
            <div className="spinner"></div>
          </div>
        ) : error ? (
          <div className="text-saturn-red text-sm">Failed to fetch signal</div>
        ) : signal ? (
          <>
            {/* Signal Badge */}
            <div className={`rounded-lg p-4 text-center ${
              signal.signal === 'BUY'
                ? 'signal-buy'
                : signal.signal === 'SELL'
                ? 'signal-sell'
                : 'signal-hold'
            }`}>
              <div className="font-display text-2xl mb-2 flex items-center justify-center gap-2">
                {signal.signal === 'BUY' ? (
                  <TrendingUp className="w-6 h-6" />
                ) : (
                  <TrendingDown className="w-6 h-6" />
                )}
                {signal.signal}
              </div>
              <div className="text-xs font-mono">Confidence</div>
              <div className="text-lg font-bold">{signal.confidence}%</div>
            </div>

            {/* Confidence Bar */}
            <div>
              <div className="text-xs text-ash-400 mb-2">Confidence Level</div>
              <div className="w-full bg-ash-700 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-saturn-purple h-full transition-all"
                  style={{ width: `${signal.confidence}%` }}
                ></div>
              </div>
            </div>

            {/* Risk Level */}
            <div className="bg-ash-800/50 rounded-lg p-3">
              <div className="text-xs text-ash-400 mb-1">Risk Level</div>
              <div className={`font-bold text-sm ${
                signal.riskLevel === 'LOW'
                  ? 'text-saturn-green'
                  : signal.riskLevel === 'MEDIUM'
                  ? 'text-yellow-500'
                  : 'text-saturn-red'
              }`}>
                {signal.riskLevel}
              </div>
            </div>

            {/* Timeframe */}
            <div className="bg-ash-800/50 rounded-lg p-3">
              <div className="text-xs text-ash-400 mb-1">Timeframe</div>
              <div className="font-mono text-sm text-saturn-gold">{signal.timeframe}</div>
            </div>

            {/* Reasoning */}
            <div className="bg-ash-800/50 rounded-lg p-3">
              <div className="text-xs text-ash-400 mb-2">Analysis</div>
              <p className="text-xs text-ash-200 leading-relaxed">
                {signal.reasoning}
              </p>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

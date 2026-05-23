// frontend/components/terminal/PumpFunPanel.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Real-time new token launches from Pump.fun
// WebSocket connection shows latest tokens as they launch
// Shows: name, symbol, market cap, graduation progress

'use client'

import { useEffect, useState } from 'react'
import { PUMPFUN_WS_URL } from '@/lib/constants'
import type { PumpFunToken } from '@/types'
import { Rocket } from 'lucide-react'

export function PumpFunPanel() {
  const [tokens, setTokens] = useState<PumpFunToken[]>([])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    let ws: WebSocket | null = null

    try {
      ws = new WebSocket(PUMPFUN_WS_URL)

      ws.onopen = () => {
        setIsConnected(true)
        // Subscribe to new token events
        ws?.send(JSON.stringify({
          method: 'subscribeNewToken'
        }))
      }

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data)
          if (data.txType === 'create') {
            const newToken: PumpFunToken = {
              mint: data.mint,
              name: data.name,
              symbol: data.symbol,
              description: data.description || '',
              image_uri: data.image_uri || '',
              creator: data.creator,
              created_timestamp: Date.now(),
              market_cap: 0,
              reply_count: 0,
              last_reply: 0,
              nsfw: false,
              market_id: '',
              inverted: false,
              is_currently_live: true,
              bonding_curve_key: '',
              associated_bonding_curve: '',
              graduation_threshold: 69.42,
              graduation_progress: 0,
            }
            setTokens(prev => [newToken, ...prev].slice(0, 20))
          }
        } catch (error) {
          console.error('[PumpFun] Parse error:', error)
        }
      }

      ws.onerror = () => setIsConnected(false)
      ws.onclose = () => setIsConnected(false)
    } catch (error) {
      console.error('[PumpFun] Connection error:', error)
    }

    return () => {
      if (ws) ws.close()
    }
  }, [])

  return (
    <div className="panel h-full">
      <div className="panel-header">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-saturn-gold" />
          <span>Pump.fun Live</span>
        </div>
        <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-saturn-green animate-pulse' : 'bg-saturn-red'}`}></div>
      </div>

      <div className="panel-content">
        {tokens.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-ash-400">
            Waiting for new tokens...
          </div>
        ) : (
          <div className="space-y-2">
            {tokens.map((token) => (
              <div
                key={token.mint}
                className="p-2 bg-ash-800/50 rounded border border-ash-700 hover:border-saturn-gold/30 transition-colors cursor-pointer"
              >
                <div className="font-mono text-xs text-saturn-gold mb-1">
                  {token.symbol}
                </div>
                <div className="text-xs text-ash-300 mb-1 truncate">
                  {token.name}
                </div>
                <div className="w-full bg-ash-700 rounded-full h-1 overflow-hidden">
                  <div
                    className="bg-saturn-green h-full transition-all"
                    style={{ width: `${token.graduation_progress || 0}%` }}
                  ></div>
                </div>
                <div className="text-xs text-ash-400 mt-1">
                  {token.graduation_progress || 0}% to graduation
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

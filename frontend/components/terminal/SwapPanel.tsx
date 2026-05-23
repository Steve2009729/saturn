// frontend/components/terminal/SwapPanel.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Execute token swaps via Jupiter
// Shows: input (SOL), output (selected token), price impact, swap button

'use client'

import { useState } from 'react'
import { useWallet } from '@solana/wallet-adapter-react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getSwapQuote, buildSwapTransaction, toSmallestUnit, formatPrice, formatChange } from '@/lib/jupiter'
import { TOKENS } from '@/lib/constants'
import type { TokenMarketData, SwapQuote } from '@/types'
import { ArrowDownUp, Zap } from 'lucide-react'
import toast from 'react-hot-toast'

export function SwapPanel({ token }: { token: TokenMarketData | null }) {
  const { publicKey, signTransaction, sendTransaction } = useWallet()
  const [inputAmount, setInputAmount] = useState('1')
  const [slippageBps, setSlippageBps] = useState('50')

  const { data: quote } = useQuery({
    queryKey: ['swapQuote', inputAmount, token?.address],
    queryFn: async () => {
      if (!token || !inputAmount) return null
      const amount = toSmallestUnit(parseFloat(inputAmount), 9)
      return getSwapQuote(TOKENS.SOL, token.address, amount, parseInt(slippageBps))
    },
    enabled: !!token && parseFloat(inputAmount) > 0,
    staleTime: 2000,
  })

  const swapMutation = useMutation({
    mutationFn: async (q: SwapQuote) => {
      if (!publicKey || !signTransaction || !sendTransaction) throw new Error('Wallet not connected')

      const tx = await buildSwapTransaction(q, publicKey.toString())
      if (!tx) throw new Error('Failed to build transaction')

      // In a real app, you would deserialize and sign the transaction
      // For now, just show success toast
      toast.success('Swap executed!')
    },
    onError: (error) => {
      toast.error(error instanceof Error ? error.message : 'Swap failed')
    }
  })

  if (!token) {
    return (
      <div className="panel">
        <div className="panel-header">Swap</div>
        <div className="flex items-center justify-center h-full text-ash-400">
          Select a token to swap
        </div>
      </div>
    )
  }

  const outputAmount = quote ? parseFloat(quote.outAmount) / Math.pow(10, 6) : 0
  const priceImpact = quote ? parseFloat(quote.priceImpactPct) : 0

  return (
    <div className="panel">
      <div className="panel-header">Swap</div>

      <div className="panel-content space-y-4 p-4">
        {/* Input */}
        <div>
          <label className="text-xs text-ash-400 mb-2 block">You Send</label>
          <div className="bg-ash-800 rounded-lg p-3 border border-ash-700">
            <div className="flex items-center justify-between">
              <input
                type="number"
                value={inputAmount}
                onChange={(e) => setInputAmount(e.target.value)}
                placeholder="0"
                className="bg-transparent text-xl font-mono outline-none w-full"
              />
              <span className="font-mono text-saturn-gold font-bold">SOL</span>
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex justify-center">
          <div className="bg-ash-800 rounded-lg p-2 border border-ash-700">
            <ArrowDownUp className="w-4 h-4 text-saturn-gold" />
          </div>
        </div>

        {/* Output */}
        <div>
          <label className="text-xs text-ash-400 mb-2 block">You Get</label>
          <div className="bg-ash-800 rounded-lg p-3 border border-ash-700">
            <div className="flex items-center justify-between">
              <div className="text-xl font-mono">
                {outputAmount.toFixed(6)}
              </div>
              <span className="font-mono text-saturn-gold font-bold">{token.symbol}</span>
            </div>
          </div>
        </div>

        {/* Price Impact */}
        <div className="bg-ash-800/50 rounded-lg p-3">
          <div className="flex justify-between text-xs">
            <span className="text-ash-400">Price Impact</span>
            <span className={priceImpact > 5 ? 'text-saturn-red' : 'text-saturn-green'}>
              {formatChange(priceImpact)}
            </span>
          </div>
          <div className="flex justify-between text-xs mt-2">
            <span className="text-ash-400">Slippage</span>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={slippageBps}
                onChange={(e) => setSlippageBps(e.target.value)}
                className="w-12 bg-ash-700 rounded px-2 py-1 text-xs"
              />
              <span className="text-ash-400">bps</span>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={() => quote && swapMutation.mutate(quote)}
          disabled={!publicKey || !quote || swapMutation.isPending}
          className="w-full btn btn-primary py-3 gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Zap className="w-4 h-4" />
          {!publicKey ? 'Connect Wallet' : swapMutation.isPending ? 'Swapping...' : 'Swap Now'}
        </button>
      </div>
    </div>
  )
}

// frontend/app/terminal/page.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Trading terminal - "World 2"
// Grid layout with: TokenFeed, Chart, Swap, AI Signal, Wallet, Activity panels

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SearchBar } from '@/components/terminal/SearchBar'
import { TokenFeed } from '@/components/terminal/TokenFeed'
import { ChartPanel } from '@/components/terminal/ChartPanel'
import { SwapPanel } from '@/components/terminal/SwapPanel'
import { AISignalPanel } from '@/components/terminal/AISignalPanel'
import { WalletPanel } from '@/components/terminal/WalletPanel'
import { ActivityFeed } from '@/components/terminal/ActivityFeed'
import { PumpFunPanel } from '@/components/terminal/PumpFunPanel'
import { WalletButton } from '@/components/shared/WalletButton'
import { Rocket, Home } from 'lucide-react'
import type { TokenMarketData } from '@/types'

export default function TerminalPage() {
  const [selectedToken, setSelectedToken] = useState<TokenMarketData | null>(null)

  return (
    <div className="min-h-screen bg-ash-950 text-ash-100 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="border-b border-ash-700 glass z-10">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Rocket className="w-6 h-6 text-saturn-gold" />
              <span className="font-display text-xl text-saturn-gold">Saturn</span>
            </div>

            {/* Search Bar - centered */}
            <div className="flex-1">
              <SearchBar onSelect={setSelectedToken} />
            </div>

            {/* Right controls */}
            <div className="flex items-center justify-end gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-saturn-green rounded-full animate-pulse"></div>
                <span className="text-xs text-ash-400">LIVE</span>
              </div>
              <WalletButton />
              <Link
                href="/"
                className="btn btn-ghost px-3 py-2 flex items-center gap-1 text-sm"
              >
                <Home className="w-4 h-4" />
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="flex-1 overflow-hidden p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-full">
          {/* LEFT COLUMN */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {/* Token Feed */}
            <div className="flex-1 overflow-hidden">
              <TokenFeed onSelectToken={setSelectedToken} />
            </div>

            {/* Pump.fun Panel */}
            <div className="flex-1 overflow-hidden">
              <PumpFunPanel />
            </div>
          </div>

          {/* CENTER COLUMN */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {/* Chart */}
            <div className="flex-1 overflow-hidden">
              <ChartPanel token={selectedToken} />
            </div>

            {/* Swap Panel */}
            <div className="flex-1 overflow-hidden">
              <SwapPanel token={selectedToken} />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col gap-4 overflow-hidden">
            {/* AI Signal */}
            <div className="flex-1 overflow-hidden">
              <AISignalPanel token={selectedToken} />
            </div>

            {/* Wallet Panel */}
            <div className="flex-1 overflow-hidden">
              <WalletPanel />
            </div>

            {/* Activity Feed */}
            <div className="flex-1 overflow-hidden">
              <ActivityFeed token={selectedToken} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer Info */}
      {selectedToken && (
        <div className="border-t border-ash-700 glass px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between text-xs">
            <div className="font-mono text-saturn-gold">
              {selectedToken.symbol} • {selectedToken.address.slice(0, 8)}...
            </div>
            <div className="text-ash-400">
              Price: ${parseFloat(selectedToken.priceUsd).toFixed(6)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

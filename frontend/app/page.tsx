// frontend/app/page.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Landing page - "World 1"
// Shows: Saturn planet animation, live token ticker, features, statistics, hero section

'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchMultiplePrices } from '@/lib/jupiter'
import { TOKENS, SITE_NAME, SITE_DESCRIPTION, FOOTER_TEXT } from '@/lib/constants'
import { 
  TrendingUp,  
  Brain, 
  Zap, 
  BarChart3, 
  Shield,
  ArrowRight,
  Rocket
} from 'lucide-react'

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)

  // Fetch live prices for ticker
  const tokenAddresses = [
    TOKENS.SOL,
    TOKENS.BONK,
    TOKENS.JUP,
    TOKENS.WIF,
    TOKENS.PYTH,
    TOKENS.RAY
  ]

  const { data: prices } = useQuery({
    queryKey: ['homePrices'],
    queryFn: () => fetchMultiplePrices(tokenAddresses),
    refetchInterval: 10000, // Update every 10 seconds
  })

  // Ticker animation
  const tickerTokens = ['SOL', 'BONK', 'JUP', 'WIF', 'PYTH', 'RAY', 'SOL', 'BONK', 'JUP']

  const handleEnterTerminal = async () => {
    setIsLoading(true)
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 300))
    window.location.href = '/terminal'
  }

  return (
    <div className="min-h-screen bg-ash-950 text-ash-100 overflow-hidden">
      {/* Background effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-saturn-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-saturn-purple/5 rounded-full blur-3xl"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-ash-700 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="font-display text-2xl text-saturn-gold flex items-center gap-2">
            <Rocket className="w-6 h-6" />
            {SITE_NAME}
          </div>
          <WalletButtonWrapper />
        </div>
      </header>

      {/* Ticker */}
      <div className="relative z-10 bg-ash-900 border-b border-ash-700 py-3 overflow-hidden">
        <div className="flex animate-ticker">
          {tickerTokens.map((symbol, idx) => {
            const address = TOKENS[symbol as keyof typeof TOKENS]
            const price = prices?.[address]?.price ?? 0
            return (
              <div key={idx} className="flex items-center gap-8 px-4 whitespace-nowrap">
                <span className="font-display text-sm text-saturn-gold">{symbol}</span>
                <span className="font-mono text-sm text-ash-100">${price.toFixed(6)}</span>
              </div>
            )
          })}
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20">
          <div className="space-y-6">
            <h1 className="font-display text-5xl lg:text-6xl text-saturn-gold leading-tight">
              Trade Solana with AI Power
            </h1>
            <p className="text-lg text-ash-300">
              {SITE_DESCRIPTION}
            </p>
            <div className="space-y-3">
              <p className="text-ash-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-saturn-gold rounded-full"></span>
                Real-time token market data
              </p>
              <p className="text-ash-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-saturn-gold rounded-full"></span>
                AI-powered trade signals
              </p>
              <p className="text-ash-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-saturn-gold rounded-full"></span>
                Pump.fun token tracking
              </p>
              <p className="text-ash-200 flex items-center gap-2">
                <span className="w-2 h-2 bg-saturn-gold rounded-full"></span>
                Advanced charting tools
              </p>
            </div>
            <button
              onClick={handleEnterTerminal}
              disabled={isLoading}
              className="btn btn-primary text-lg py-4 px-8 group"
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Loading...
                </>
              ) : (
                <>
                  ENTER TERMINAL
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </div>

          {/* Saturn Planet Animation */}
          <div className="flex items-center justify-center">
            <div className="relative w-72 h-72 md:w-96 md:h-96">
              {/* Planet */}
              <div className="absolute inset-0 bg-gradient-to-br from-ash-600 to-ash-800 rounded-full glow-gold animate-pulse-gold"></div>

              {/* Ring */}
              <div
                className="absolute inset-0 rounded-full border-8 border-saturn-gold/40"
                style={{
                  transform: 'perspective(1200px) rotateX(70deg) rotateZ(0deg)',
                }}
              ></div>

              {/* Rotating ring light */}
              <div
                className="absolute inset-0 rounded-full border-4 border-transparent border-t-saturn-gold border-r-saturn-gold"
                style={{
                  transform: 'perspective(1200px) rotateX(70deg)',
                  animation: 'spin-slow 20s linear infinite',
                }}
              ></div>

              {/* Center glow */}
              <div className="absolute inset-1/4 bg-saturn-gold/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 border-t border-ash-700">
          <h2 className="font-display text-3xl text-saturn-gold mb-12 text-center">
            Platform Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={<TrendingUp className="w-6 h-6" />}
              title="Real-Time Data"
              description="Live market data updated every 5 seconds across all tokens"
            />
            <FeatureCard
              icon={<Brain className="w-6 h-6" />}
              title="AI Signals"
              description="Claude AI analyzes tokens and generates BUY/SELL/HOLD signals"
            />
            <FeatureCard
              icon={<Rocket className="w-6 h-6" />}
              title="Pump.fun Tracker"
              description="Track new token launches in real-time on Pump.fun"
            />
            <FeatureCard
              icon={<BarChart3 className="w-6 h-6" />}
              title="Advanced Charts"
              description="TradingView candlestick charts with multiple timeframes"
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Instant Swaps"
              description="Execute trades with Jupiter DEX's best rates"
            />
            <FeatureCard
              icon={<Shield className="w-6 h-6" />}
              title="Portfolio Tracking"
              description="Monitor your wallet holdings and performance"
            />
          </div>
        </div>

        {/* Statistics Section */}
        <div className="py-20 border-t border-ash-700">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <StatCard number="500+" label="Tokens Tracked" />
            <StatCard number="24/7" label="Market Monitoring" />
            <StatCard number="AI" label="Signal Engine" />
            <StatCard number="0%" label="Trading Fees" />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-ash-700 glass mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-ash-400 text-sm">
          {FOOTER_TEXT}
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode
  title: string
  description: string
}) {
  return (
    <div className="panel">
      <div className="text-saturn-gold mb-3">{icon}</div>
      <h3 className="font-display text-lg text-saturn-gold mb-2">{title}</h3>
      <p className="text-ash-300 text-sm">{description}</p>
    </div>
  )
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="panel text-center">
      <div className="font-display text-3xl text-saturn-gold mb-2">{number}</div>
      <div className="text-ash-300 text-sm">{label}</div>
    </div>
  )
}

function WalletButtonWrapper() {
  return (
    <div className="font-mono text-sm text-ash-300">
      Ready to trade?
    </div>
  )
}

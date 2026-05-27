// frontend/components/terminal/ChartPanel.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: TradingView lightweight-charts for OHLCV candlestick data
// Shows selected token price history with multiple timeframes

'use client'

import { useEffect, useRef, useState } from 'react'
import { createChart } from 'lightweight-charts'
import { fetchPriceHistory } from '@/lib/birdeye'
import type { TokenMarketData, CandlestickData } from '@/types'

const timeframes = ['1m', '5m', '15m', '1H', '4H', '1D'] as const

export function ChartPanel({ token }: { token: TokenMarketData | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [timeframe, setTimeframe] = useState<typeof timeframes[number]>('1H')
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !token) return

    const container = containerRef.current
    if (container.innerHTML) container.innerHTML = ''

    const chart = createChart(container, {
      layout: {
        textColor: '#C5D0DC',
        background: { color: '#161B22' },
      },
      width: container.clientWidth,
      height: container.clientHeight,
      timeScale: {
        timeVisible: true,
      },
    })

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#3FB950',
      downColor: '#F85149',
      wickUpColor: '#3FB950',
      wickDownColor: '#F85149',
    })

    // Fetch and display data
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const timeMapping: Record<string, string> = {
          '1m': '1M',
          '5m': '5M',
          '15m': '15M',
          '1H': '1H',
          '4H': '4H',
          '1D': '1D',
        }

        const history = await fetchPriceHistory(
          token.address,
          timeMapping[timeframe]
        )

        const candleData: CandlestickData[] = history
          .map((item: any) => ({
            time: Math.floor(new Date(item.startTime).getTime() / 1000),
            open: parseFloat(item.o),
            high: parseFloat(item.h),
            low: parseFloat(item.l),
            close: parseFloat(item.c),
            volume: parseFloat(item.v),
          }))
          .sort((a: any, b: any) => a.time - b.time)

if (candleData.length > 0) {
  candleSeries.setData(candleData as any)
  chart.timeScale().fitContent()
}
} catch (error) {
  console.error('[Chart] Failed to fetch data:', error)
} finally {
  setIsLoading(false)
}
}

    fetchData()

    const handleResize = () => {
      if (container.parentElement) {
        chart.applyOptions({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
      chart.remove()
    }
  }, [token, timeframe])

  if (!token) {
    return (
      <div className="panel">
        <div className="panel-header">Chart</div>
        <div className="flex items-center justify-center h-full text-ash-400">
          Select a token to view chart
        </div>
      </div>
    )
  }

  return (
    <div className="panel">
      <div className="panel-header">
        <div>
          <div className="font-mono text-saturn-gold">{token.symbol}</div>
          <div className="text-xs text-ash-400">{token.address.slice(0, 8)}...</div>
        </div>
        <div className="flex gap-1 flex-wrap">
          {timeframes.map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              disabled={isLoading}
              className={`px-2 py-1 rounded text-xs font-mono transition-all ${
                timeframe === tf
                  ? 'bg-saturn-gold text-ash-950'
                  : 'bg-ash-700 text-ash-300 hover:bg-ash-600'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      <div
        ref={containerRef}
        className="panel-content"
        style={{ minHeight: '300px' }}
      />
    </div>
  )
}

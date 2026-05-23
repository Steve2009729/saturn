// frontend/lib/dexscreener.ts
// RUNS ON: Vercel (Frontend)
// PURPOSE: Fetches token market data from DexScreener
// Gives us: price changes (1h, 6h, 24h), volume, liquidity, buy/sell counts

import axios from 'axios'
import { DEXSCREENER_URL, DEXSCREENER_SEARCH_URL } from './constants'
import type { TokenMarketData } from '@/types'

// Fetch market data for a specific token by its Solana address
export async function fetchTokenMarketData(
  tokenAddress: string
): Promise<TokenMarketData | null> {
  try {
    const response = await axios.get(`${DEXSCREENER_URL}${tokenAddress}`)
    const pairs = response.data.pairs
    if (!pairs || pairs.length === 0) return null

    const bestPair = pairs.sort(
      (a: any, b: any) => (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0)
    )[0]

    return {
      address: tokenAddress,
      symbol: bestPair.baseToken.symbol,
      priceUsd: bestPair.priceUsd,
      priceChange: {
        h1: bestPair.priceChange?.h1 ?? 0,
        h6: bestPair.priceChange?.h6 ?? 0,
        h24: bestPair.priceChange?.h24 ?? 0,
      },
      volume: {
        h24: bestPair.volume?.h24 ?? 0,
      },
      liquidity: {
        usd: bestPair.liquidity?.usd ?? 0,
      },
      txns: {
        h24: {
          buys: bestPair.txns?.h24?.buys ?? 0,
          sells: bestPair.txns?.h24?.sells ?? 0,
        }
      },
      fdv: bestPair.fdv ?? 0,
      marketCap: bestPair.marketCap ?? 0,
    }
  } catch (error) {
    console.error('[DexScreener] Market data fetch failed:', error)
    return null
  }
}

// Search for tokens by name or symbol
export async function searchTokens(query: string): Promise<TokenMarketData[]> {
  try {
    const response = await axios.get(`${DEXSCREENER_SEARCH_URL}${encodeURIComponent(query)}`)
    const pairs = response.data.pairs ?? []

    return pairs
      .filter((pair: any) => pair.chainId === 'solana')
      .slice(0, 20)
      .map((pair: any) => ({
        address: pair.baseToken.address,
        symbol: pair.baseToken.symbol,
        priceUsd: pair.priceUsd,
        priceChange: {
          h1: pair.priceChange?.h1 ?? 0,
          h6: pair.priceChange?.h6 ?? 0,
          h24: pair.priceChange?.h24 ?? 0,
        },
        volume: { h24: pair.volume?.h24 ?? 0 },
        liquidity: { usd: pair.liquidity?.usd ?? 0 },
        txns: { h24: { buys: pair.txns?.h24?.buys ?? 0, sells: pair.txns?.h24?.sells ?? 0 } },
        fdv: pair.fdv ?? 0,
        marketCap: pair.marketCap ?? 0,
      }))
  } catch (error) {
    console.error('[DexScreener] Search failed:', error)
    return []
  }
}

// Fetch top trending Solana tokens right now
export async function fetchTrendingTokens(): Promise<TokenMarketData[]> {
  try {
    const response = await axios.get(
      'https://api.dexscreener.com/latest/dex/tokens/solana'
    )
    const pairs = response.data.pairs ?? []

    return pairs
      .filter((pair: any) => pair.chainId === 'solana' && pair.volume?.h24 > 10000)
      .sort((a: any, b: any) => (b.volume?.h24 ?? 0) - (a.volume?.h24 ?? 0))
      .slice(0, 100)
      .map((pair: any) => ({
        address: pair.baseToken.address,
        symbol: pair.baseToken.symbol,
        priceUsd: pair.priceUsd,
        priceChange: {
          h1: pair.priceChange?.h1 ?? 0,
          h6: pair.priceChange?.h6 ?? 0,
          h24: pair.priceChange?.h24 ?? 0,
        },
        volume: { h24: pair.volume?.h24 ?? 0 },
        liquidity: { usd: pair.liquidity?.usd ?? 0 },
        txns: { h24: { buys: pair.txns?.h24?.buys ?? 0, sells: pair.txns?.h24?.sells ?? 0 } },
        fdv: pair.fdv ?? 0,
        marketCap: pair.marketCap ?? 0,
      }))
  } catch (error) {
    console.error('[DexScreener] Trending fetch failed:', error)
    return []
  }
}

// Format volume for display
export function formatVolume(volume: number): string {
  if (volume >= 1000000000) return `$${(volume / 1000000000).toFixed(1)}B`
  if (volume >= 1000000) return `$${(volume / 1000000).toFixed(1)}M`
  if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
  return `$${volume.toFixed(0)}`
}

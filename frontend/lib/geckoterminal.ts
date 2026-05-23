// frontend/lib/geckoterminal.ts
// RUNS ON: Vercel (Frontend)
// PURPOSE: Pool data, trending tokens, new liquidity pools on Solana

import axios from 'axios'
import { GECKO_SOLANA_POOLS, GECKO_TRENDING } from './constants'

// Fetch top trending Solana pools right now
export async function fetchTrendingPools() {
  try {
    const response = await axios.get(GECKO_TRENDING, {
      params: { include: 'base_token,quote_token' }
    })
    return response.data.data ?? []
  } catch (error) {
    console.error('[GeckoTerminal] Trending pools failed:', error)
    return []
  }
}

// Fetch newest Solana liquidity pools
export async function fetchNewPools() {
  try {
    const response = await axios.get(GECKO_SOLANA_POOLS, {
      params: {
        sort: 'pool_created_at_desc',
        include: 'base_token',
        page: 1,
      }
    })
    return response.data.data ?? []
  } catch (error) {
    console.error('[GeckoTerminal] New pools failed:', error)
    return []
  }
}

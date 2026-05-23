// frontend/lib/birdeye.ts
// RUNS ON: Vercel (Frontend)
// PURPOSE: Fetches detailed token analytics from Birdeye

import axios from 'axios'
import { BIRDEYE_BASE_URL, BIRDEYE_API_KEY } from './constants'

const birdeyeHeaders = {
  'X-API-KEY': BIRDEYE_API_KEY,
  'x-chain': 'solana',
}

// Fetch complete token overview
export async function fetchTokenOverview(tokenAddress: string) {
  try {
    const response = await axios.get(
      `${BIRDEYE_BASE_URL}/defi/token_overview`,
      {
        params: { address: tokenAddress },
        headers: birdeyeHeaders,
      }
    )
    return response.data.data
  } catch (error) {
    console.error('[Birdeye] Token overview failed:', error)
    return null
  }
}

// Fetch number of unique token holders
export async function fetchHolderCount(tokenAddress: string): Promise<number> {
  try {
    const response = await axios.get(
      `${BIRDEYE_BASE_URL}/defi/token_holder`,
      {
        params: { address: tokenAddress },
        headers: birdeyeHeaders,
      }
    )
    return response.data.data?.total ?? 0
  } catch (error) {
    console.error('[Birdeye] Holder count failed:', error)
    return 0
  }
}

// Fetch price history for chart
export async function fetchPriceHistory(
  tokenAddress: string,
  type: string = '1H',
  timeFrom: number = Math.floor(Date.now() / 1000) - 86400,
  timeTo: number = Math.floor(Date.now() / 1000)
) {
  try {
    const response = await axios.get(
      `${BIRDEYE_BASE_URL}/defi/ohlcv`,
      {
        params: {
          address: tokenAddress,
          type,
          time_from: timeFrom,
          time_to: timeTo,
        },
        headers: birdeyeHeaders,
      }
    )
    return response.data.data?.items ?? []
  } catch (error) {
    console.error('[Birdeye] Price history failed:', error)
    return []
  }
}

// Fetch recent trades for a token
export async function fetchTokenTrades(tokenAddress: string, limit: number = 50) {
  try {
    const response = await axios.get(
      `${BIRDEYE_BASE_URL}/defi/txs/token`,
      {
        params: {
          address: tokenAddress,
          limit,
          tx_type: 'swap',
        },
        headers: birdeyeHeaders,
      }
    )
    return response.data.data?.items ?? []
  } catch (error) {
    console.error('[Birdeye] Token trades failed:', error)
    return []
  }
}

// Fetch wallet token holdings
export async function fetchWalletHoldings(walletAddress: string) {
  try {
    const response = await axios.get(
      `${BIRDEYE_BASE_URL}/v1/wallet/token_list`,
      {
        params: { wallet: walletAddress },
        headers: birdeyeHeaders,
      }
    )
    return response.data.data?.items ?? []
  } catch (error) {
    console.error('[Birdeye] Wallet holdings failed:', error)
    return []
  }
}

// frontend/lib/jupiter.ts
// RUNS ON: Vercel (Frontend)
// PURPOSE: Handles all communication with Jupiter DEX API
// Jupiter gives us: token list, live prices, swap quotes, swap execution
// This is the trading engine of Saturn — most important library file
// COST: Completely FREE — no API key needed ever

import axios from 'axios'
import {
  JUPITER_TOKEN_URL,
  JUPITER_PRICE_URL,
  JUPITER_SWAP_URL,
  JUPITER_EXECUTE_URL
} from './constants'
import type { Token, TokenPrice, SwapQuote } from '@/types'

// Fetch complete list of all Solana tokens from Jupiter
export async function fetchAllTokens(): Promise<Token[]> {
  try {
    const response = await axios.get<Token[]>(JUPITER_TOKEN_URL)
    return response.data
  } catch (error) {
    console.error('[Jupiter] Token list fetch failed:', error)
    return []
  }
}

// Fetch current USD price for a single token
export async function fetchSinglePrice(tokenMint: string): Promise<number> {
  try {
    const response = await axios.get(`${JUPITER_PRICE_URL}?ids=${tokenMint}`)
    return response.data.data[tokenMint]?.price ?? 0
  } catch (error) {
    console.error('[Jupiter] Single price fetch failed:', error)
    return 0
  }
}

// Fetch prices for multiple tokens at once
export async function fetchMultiplePrices(
  tokenMints: string[]
): Promise<Record<string, TokenPrice>> {
  try {
    const ids = tokenMints.join(',')
    const response = await axios.get(`${JUPITER_PRICE_URL}?ids=${ids}`)
    return response.data.data ?? {}
  } catch (error) {
    console.error('[Jupiter] Multiple prices fetch failed:', error)
    return {}
  }
}

// Get a swap quote
export async function getSwapQuote(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50
): Promise<SwapQuote | null> {
  try {
    const response = await axios.get(JUPITER_SWAP_URL, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
        onlyDirectRoutes: false,
        asLegacyTransaction: false,
      }
    })
    return response.data
  } catch (error) {
    console.error('[Jupiter] Swap quote failed:', error)
    return null
  }
}

// Execute a swap transaction
export async function buildSwapTransaction(
  quote: SwapQuote,
  userPublicKey: string
): Promise<string | null> {
  try {
    const response = await axios.post(JUPITER_EXECUTE_URL, {
      quoteResponse: quote,
      userPublicKey,
      wrapAndUnwrapSol: true,
      dynamicComputeUnitLimit: true,
      prioritizationFeeLamports: 'auto'
    })
    return response.data.swapTransaction
  } catch (error) {
    console.error('[Jupiter] Swap build failed:', error)
    return null
  }
}

// Helper — convert human readable amount to lamports/smallest unit
export function toSmallestUnit(amount: number, decimals: number): number {
  return Math.floor(amount * Math.pow(10, decimals))
}

// Helper — convert smallest unit back to human readable
export function fromSmallestUnit(amount: number, decimals: number): number {
  return amount / Math.pow(10, decimals)
}

// Helper — format price nicely for display
export function formatPrice(price: number): string {
  if (!price || price === 0) return '$0.00'
  if (price < 0.000001) return `$${price.toExponential(2)}`
  if (price < 0.001) return `$${price.toFixed(8)}`
  if (price < 1) return `$${price.toFixed(6)}`
  if (price < 1000) return `$${price.toFixed(4)}`
  if (price < 1000000) return `$${price.toLocaleString('en-US', { maximumFractionDigits: 2 })}`
  return `$${(price / 1000000).toFixed(2)}M`
}

// Helper — format percentage change with + or - sign
export function formatChange(change: number): string {
  const sign = change >= 0 ? '+' : ''
  return `${sign}${change.toFixed(2)}%`
}

// Helper — shorten wallet address for display
export function shortenAddress(address: string, chars: number = 4): string {
  return `${address.slice(0, chars)}...${address.slice(-chars)}`
}

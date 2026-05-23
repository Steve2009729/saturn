// frontend/lib/constants.ts
// RUNS ON: Vercel (Frontend)
// All API endpoints, popular tokens, and site constants
// Every component imports from here — never hardcode URLs

// ===== JUPITER ENDPOINTS =====
// Jupiter is completely FREE — no API key needed
export const JUPITER_TOKEN_URL = process.env.NEXT_PUBLIC_JUPITER_TOKEN_URL!
export const JUPITER_PRICE_URL = process.env.NEXT_PUBLIC_JUPITER_PRICE_URL!
export const JUPITER_SWAP_URL = process.env.NEXT_PUBLIC_JUPITER_SWAP_URL!
export const JUPITER_EXECUTE_URL = process.env.NEXT_PUBLIC_JUPITER_EXECUTE_URL!

// ===== DEXSCREENER ENDPOINTS =====
// DexScreener is completely FREE — no API key needed
export const DEXSCREENER_URL = process.env.NEXT_PUBLIC_DEXSCREENER_URL!
export const DEXSCREENER_PAIRS_URL = 'https://api.dexscreener.com/latest/dex/pairs/solana'
export const DEXSCREENER_SEARCH_URL = 'https://api.dexscreener.com/latest/dex/search?q='

// ===== GECKO TERMINAL ENDPOINTS =====
// GeckoTerminal is completely FREE — no API key needed
export const GECKO_URL = process.env.NEXT_PUBLIC_GECKO_URL!
export const GECKO_SOLANA_POOLS = `${GECKO_URL}/networks/solana/pools`
export const GECKO_TRENDING = `${GECKO_URL}/networks/solana/trending_pools`

// ===== BIRDEYE ENDPOINTS =====
// Birdeye needs API key — stored in env
export const BIRDEYE_BASE_URL = 'https://public-api.birdeye.so'
export const BIRDEYE_API_KEY = process.env.NEXT_PUBLIC_BIRDEYE_API_KEY!

// ===== PUMP.FUN ENDPOINTS =====
// Pump.fun WebSocket — completely FREE — no key needed
export const PUMPFUN_WS_URL = process.env.NEXT_PUBLIC_PUMPFUN_WS!
export const PUMPFUN_TOKEN_URL = 'https://frontend-api.pump.fun/coins'

// ===== BACKEND URL =====
export const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!

// ===== HELIUS =====
export const HELIUS_RPC_URL = process.env.NEXT_PUBLIC_HELIUS_RPC_URL!

// ===== POPULAR SOLANA TOKEN ADDRESSES =====
// These are the official Solana mint addresses for popular tokens
export const TOKENS = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  BONK: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263',
  JUP: 'JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN',
  WIF: 'EKpQGSJtjMFqKZ9KQanSqYXRcF8fBopzLHYxdM65zcjm',
  PYTH: 'HZ1JovNiVvGrGs7dKaXrGYNbN52gCHiBQSKBLzCHrZ2M',
  RAY: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R',
  ORCA: 'orcaEKTdK7LKz57vaAYr9QeNsVEPfiu6QeMU1kektZE',
}

// ===== SITE INFO =====
export const SITE_NAME = 'Saturn'
export const SITE_TAGLINE = 'The Solana Trading Terminal'
export const SITE_DESCRIPTION = 'Trade any Solana token with AI powered signals, real time data, and the best swap rates.'
export const FOOTER_TEXT = '© 2026 Saturn. All rights reserved.'

// ===== PRICE REFRESH INTERVALS =====
export const PRICE_REFRESH_MS = 5000        // Refresh prices every 5 seconds
export const TOKEN_LIST_REFRESH_MS = 60000  // Refresh token list every 60 seconds
export const SIGNAL_REFRESH_MS = 30000      // Refresh AI signals every 30 seconds

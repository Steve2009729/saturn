// frontend/types/index.ts
// TypeScript type definitions for Saturn
// Every data structure used across the entire app is defined here

// A Solana token from Jupiter token list
export interface Token {
  address: string          // Solana mint address — unique identifier
  symbol: string           // Short name e.g. SOL, BONK, JUP
  name: string             // Full name e.g. Solana, Bonk, Jupiter
  decimals: number         // How many decimal places (SOL = 9)
  logoURI: string          // Token logo image URL
  tags: string[]           // Categories e.g. ['defi', 'meme']
  extensions?: {
    coingeckoId?: string
    website?: string
    twitter?: string
  }
}

// Live price data from Jupiter Price API
export interface TokenPrice {
  id: string               // Token mint address
  mintSymbol: string       // Token symbol
  vsToken: string          // Quote token (usually USDC)
  vsTokenSymbol: string    // Quote symbol
  price: number            // Current price in USD
}

// Token market data from DexScreener
export interface TokenMarketData {
  address: string
  symbol: string
  priceUsd: string
  priceChange: {
    h1: number             // 1 hour price change percentage
    h6: number             // 6 hour price change percentage
    h24: number            // 24 hour price change percentage
  }
  volume: {
    h24: number            // 24 hour trading volume in USD
  }
  liquidity: {
    usd: number            // Total liquidity in USD
  }
  txns: {
    h24: {
      buys: number         // Number of buys in 24 hours
      sells: number        // Number of sells in 24 hours
    }
  }
  fdv: number              // Fully diluted valuation
  marketCap: number        // Market capitalization
}

// A new token launching on Pump.fun
export interface PumpFunToken {
  mint: string             // Token mint address
  name: string             // Token name
  symbol: string           // Token symbol
  description: string      // Token description
  image_uri: string        // Token logo
  twitter?: string         // Twitter handle
  telegram?: string        // Telegram group
  bonding_curve_key: string
  associated_bonding_curve: string
  creator: string          // Creator wallet address
  created_timestamp: number // Unix timestamp of creation
  market_cap: number       // Current market cap in SOL
  reply_count: number      // Number of replies/comments
  last_reply: number       // Timestamp of last reply
  nsfw: boolean
  market_id: string
  inverted: boolean
  is_currently_live: boolean
  king_of_the_hill_timestamp?: number
  graduation_threshold: number // SOL needed to graduate to Raydium
  graduation_progress: number  // Percentage toward graduation (0-100)
}

// AI trade signal from Anthropic
export interface AISignal {
  signal: 'BUY' | 'SELL' | 'HOLD'
  confidence: number       // 0-100 confidence score
  reasoning: string        // Explanation of the signal
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH'
  timeframe: string        // Suggested holding period
  targetPrice?: number     // Price target if applicable
  stopLoss?: number        // Stop loss level if applicable
  tokenSymbol: string      // Which token this signal is for
  timestamp: number        // When this signal was generated
}

// Jupiter swap quote
export interface SwapQuote {
  inputMint: string
  inAmount: string
  outputMint: string
  outAmount: string
  otherAmountThreshold: string
  swapMode: string
  slippageBps: number
  priceImpactPct: string
  routePlan: RoutePlan[]
}

export interface RoutePlan {
  swapInfo: {
    ammKey: string
    label: string
    inputMint: string
    outputMint: string
    inAmount: string
    outAmount: string
    feeAmount: string
    feeMint: string
  }
  percent: number
}

// Wallet token holding
export interface WalletHolding {
  mint: string
  symbol: string
  name: string
  logoURI: string
  amount: number           // Raw amount in smallest unit
  uiAmount: number         // Human readable amount
  decimals: number
  priceUsd: number
  valueUsd: number         // Total value = uiAmount * priceUsd
}

// Candlestick data for TradingView charts
export interface CandlestickData {
  time: number             // Unix timestamp
  open: number
  high: number
  low: number
  close: number
  volume?: number
}

// Token activity transaction
export interface TokenActivity {
  signature: string        // Transaction signature
  type: 'BUY' | 'SELL' | 'TRANSFER'
  amount: number
  price: number
  valueUsd: number
  wallet: string           // Wallet address that made the trade
  timestamp: number
}

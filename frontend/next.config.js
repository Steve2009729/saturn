/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        os: false,
        path: false,
        crypto: false,
      }
    }
    return config
  },
  env: {
    NEXT_PUBLIC_JUPITER_TOKEN_URL: 'https://token.jup.ag/all',
    NEXT_PUBLIC_JUPITER_PRICE_URL: 'https://price.jup.ag/v6/price',
    NEXT_PUBLIC_JUPITER_SWAP_URL: 'https://quote-api.jup.ag/v6/quote',
    NEXT_PUBLIC_JUPITER_EXECUTE_URL: 'https://quote-api.jup.ag/v6/swap',
    NEXT_PUBLIC_DEXSCREENER_URL: 'https://api.dexscreener.com/latest/dex/pairs/solana/',
    NEXT_PUBLIC_GECKO_URL: 'https://api.geckoterminal.com/api/v2',
    NEXT_PUBLIC_PUMPFUN_WS: 'wss://pumpportal.fun/api/data',
  },
}

module.exports = nextConfig

# Saturn — The Solana Trading Terminal

🚀 **AI-Powered Token Trading on Solana**

Fully functional Solana DeFi trading terminal with real-time market data, AI trade signals, Jupiter swaps, and Pump.fun token tracking.

## 🌍 Two Worlds

### World 1: Landing Page (`/`)
- Saturn planet animation with rotating ring
- Live token price ticker (SOL, BONK, JUP, WIF, PYTH, RAY)
- Feature showcase with 6 cards
- Statistics display
- "ENTER TERMINAL" button

### World 2: Trading Terminal (`/terminal`)
**Left Column:**
- Token Feed: Trending/Gainers/Losers filter with live updates
- Pump.fun Panel: Real-time new token launches

**Center Column:**
- Chart Panel: TradingView candlestick charts (1m–1D)
- Swap Panel: Jupiter DEX swap interface

**Right Column:**
- AI Signal Panel: Claude-powered BUY/SELL/HOLD signals
- Wallet Panel: Connected wallet portfolio
- Activity Feed: Recent token transactions

## 🛠️ Tech Stack

**Frontend:**
- Next.js 14 + TypeScript
- Tailwind CSS v3 (Saturn design system)
- Framer Motion animations
- React Query for data fetching
- @solana/wallet-adapter for wallet connection

**Data APIs (All FREE):**
- **Jupiter** – Token list, swap quotes, execution
- **DexScreener** – Market data, trending tokens
- **Birdeye** – Charts, holder count, wallet holdings
- **GeckoTerminal** – Pool trends
- **Pump.fun** – WebSocket for new launches

**Backend:**
- Node.js + Express
- Anthropic Claude API (AI signals)
- Supabase (user profiles, auth)

**Deployment:**
- Frontend: **Vercel**
- Backend: **Railway**

## 📋 Project Structure

```
saturn/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx          (root layout with providers)
│   │   ├── globals.css         (Saturn design system - 500+ lines)
│   │   ├── page.tsx            (World 1 - landing page)
│   │   └── terminal/
│   │       └── page.tsx        (World 2 - trading terminal)
│   ├── components/
│   │   ├── shared/
│   │   │   └── WalletButton.tsx
│   │   └── terminal/
│   │       ├── SearchBar.tsx
│   │       ├── TokenFeed.tsx
│   │       ├── ChartPanel.tsx
│   │       ├── SwapPanel.tsx
│   │       ├── AISignalPanel.tsx
│   │       ├── PumpFunPanel.tsx
│   │       ├── WalletPanel.tsx
│   │       └── ActivityFeed.tsx
│   ├── providers/
│   │   ├── QueryProvider.tsx
│   │   └── WalletProvider.tsx
│   ├── lib/
│   │   ├── jupiter.ts          (token list, prices, swaps)
│   │   ├── dexscreener.ts      (market data, search)
│   │   ├── birdeye.ts          (charts, holdings)
│   │   ├── geckoterminal.ts    (trending pools)
│   │   ├── supabase.ts         (auth, user profiles)
│   │   └── constants.ts        (API endpoints, tokens)
│   ├── types/
│   │   └── index.ts            (TypeScript definitions)
│   ├── package.json
│   ├── next.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── .env.local              (NEXT_PUBLIC_ environment variables)
│   └── .gitignore
│
├── backend/
│   ├── index.js                (Express server, CORS setup)
│   ├── routes/
│   │   ├── signal.js           (Claude AI signal endpoint)
│   │   └── auth.js             (auth helpers)
│   ├── package.json
│   ├── .env                    (secret API keys - NEVER commit)
│   └── .gitignore
│
└── .gitignore                  (root gitignore)
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### 1. Frontend Setup

```bash
cd frontend

# Install dependencies (in order, NEVER all at once)
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui @solana/wallet-adapter-base

npm install framer-motion lucide-react react-hot-toast

npm install lightweight-charts @tanstack/react-query axios

npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

npm install -D webpack

# Create .env.local and add API keys (see .env.local file)
# Get keys from:
# - Birdeye: https://birdeye.so
# - Helius: https://helius.xyz
# - Supabase: https://supabase.com

# Run development server
npm run dev
# Visit http://localhost:3000
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies (in order)
npm install express cors dotenv @anthropic-ai/sdk axios @supabase/supabase-js

npm install -D nodemon

# Create .env with secret keys:
# - ANTHROPIC_API_KEY: Get from https://console.anthropic.com
# - SUPABASE_SERVICE_ROLE_KEY: From Supabase dashboard
# - Other API keys as needed

# Run development server
npm run dev
# Backend will run on http://localhost:5000
```

## 🔑 Required API Keys

| Service | Purpose | Key Needed | Free | Link |
|---------|---------|-----------|------|------|
| Jupiter | Token list, swaps | No | ✅ | https://jup.ag |
| DexScreener | Market data | No | ✅ | https://dexscreener.com |
| Birdeye | Charts, holdings | Yes | ✅ Free tier | https://birdeye.so |
| GeckoTerminal | Trending pools | No | ✅ | https://geckoterminal.com |
| Pump.fun | New tokens WebSocket | No | ✅ | https://pump.fun |
| Helius | Solana RPC endpoint | Yes | ✅ Free tier | https://helius.xyz |
| Supabase | Auth, user profiles | Yes | ✅ Free tier | https://supabase.com |
| Anthropic | AI signals (Claude) | Yes | ✅ Free credits | https://console.anthropic.com |

## 🎨 Design System

**Colors:**
- `ash-950` (#080A0E) - Main background
- `saturn-gold` (#F0A500) - Primary accent
- `saturn-green` (#3FB950) - Buy/Success
- `saturn-red` (#F85149) - Sell/Danger
- `saturn-purple` (#8B5CF6) - AI/Signals

**Fonts:**
- `Space Grotesk` - Headers & display
- `Rajdhani` - Body text
- `Share Tech Mono` - Prices & data

**Effects:**
- Glass morphism panels
- Glow effects on interactive elements
- Smooth animations throughout

## 📱 Responsive Design

- **Desktop** (1536px+): Full 3-column grid layout
- **Tablet** (1024px-1535px): 3-column responsive
- **Mobile** (<1024px): Single column stack

## 🔐 Security

- ✅ Claude API key ONLY in backend (never in frontend)
- ✅ All frontend env vars start with `NEXT_PUBLIC_` (frontend-safe only)
- ✅ Backend env vars secret (Vercel & Railway manage these)
- ✅ Wallet adapter handles private keys (never sent to backend)
- ✅ CORS configured to only accept frontend requests
- ✅ Supabase RLS policies for data isolation

## 📊 Data Flow

1. **User selects token** → Frontend fetches from DexScreener
2. **Chart requested** → Frontend fetches from Birdeye
3. **Swap initiated** → Frontend gets quote from Jupiter
4. **AI signal needed** → Frontend requests `/api/signal` from backend
5. **Backend analyzes** → Calls Anthropic Claude API
6. **Signal returned** → Frontend displays with confidence, reasoning, risk

## 🚀 Deployment

### Frontend (Vercel)
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys from GitHub
# Set environment variables in Vercel dashboard
```

### Backend (Railway)
```bash
# Connect GitHub repo to Railway
# Set environment variables in Railway dashboard:
# - ANTHROPIC_API_KEY
# - SUPABASE_*
# - BIRDEYE_API_KEY
# - etc.

# Railway auto-deploys on push
```

## ⚙️ Configuration

### `next.config.js`
- Webpack polyfills for Solana wallet
- Environment variables

### `tailwind.config.js`
- Saturn color palette
- Custom animations
- Extended theme

### `tsconfig.json`
- Path aliases (`@/*`)
- Strict type checking

### `globals.css`
- Design system (500+ lines)
- CSS variables
- Component styles
- Animations

## 🐛 Troubleshooting

**Wallet won't connect:**
- Ensure Phantom/other wallet is installed
- Check Helius RPC URL in `.env.local`

**Charts not loading:**
- Verify Birdeye API key
- Check token address format

**Swaps failing:**
- Check wallet has SOL for gas
- Verify Jupiter API endpoints
- Check slippage settings

**AI signals timing out:**
- Verify backend is running
- Check ANTHROPIC_API_KEY in backend/.env
- Check CORS frontend URL in backend

## 📚 Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Jupiter API](https://docs.jup.ag/)
- [Solana Wallet Adapter](https://github.com/solana-labs/wallet-adapter)
- [Anthropic API](https://docs.anthropic.com/)
- [Supabase Docs](https://supabase.com/docs)

## 📝 License

MIT

## 🤝 Support

For issues or questions:
1. Check troubleshooting section above
2. Review environment variable configuration
3. Verify all API keys are valid
4. Check backend/frontend logs

---

**Built with ❤️ for Solana traders**

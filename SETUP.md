# Saturn Setup & Deployment Guide

Complete step-by-step instructions to get Saturn running locally and deployed to production.

## Phase 1: Local Development Setup

### Step 1: Get API Keys

Before running anything, collect these API keys:

1. **Birdeye** (for charts & analytics)
   - Go to https://birdeye.so
   - Sign up, create API key
   - Add to `frontend/.env.local`: `NEXT_PUBLIC_BIRDEYE_API_KEY=...`

2. **Helius** (for Solana RPC)
   - Go to https://helius.xyz
   - Sign up, create API key
   - Add to `frontend/.env.local`: `NEXT_PUBLIC_HELIUS_RPC_URL=https://mainnet.helius-rpc.com/?api-key=...`

3. **Anthropic Claude** (for AI signals)
   - Go to https://console.anthropic.com
   - Create account, generate API key
   - Add to `backend/.env`: `ANTHROPIC_API_KEY=sk-ant-...`

4. **Supabase** (for auth & user data)
   - Go to https://supabase.com
   - Create new project
   - Copy Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - Copy Anon Key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - Copy Service Role Key → `backend/.env`: `SUPABASE_SERVICE_ROLE_KEY=...`

### Step 2: Frontend Setup

```bash
# Navigate to frontend directory
cd saturn/frontend

# Install dependencies in batches (NEVER all at once!)
# Batch 1: Solana
npm install @solana/web3.js @solana/wallet-adapter-react @solana/wallet-adapter-wallets @solana/wallet-adapter-react-ui @solana/wallet-adapter-base

# Batch 2: UI & Notifications
npm install framer-motion lucide-react react-hot-toast

# Batch 3: Data & Charts
npm install lightweight-charts @tanstack/react-query axios

# Batch 4: Auth & Database
npm install @supabase/supabase-js @supabase/auth-helpers-nextjs

# Batch 5: Build tools
npm install -D webpack

# Verify installation
npm list
```

### Step 3: Frontend Configuration

```bash
# .env.local should look like:
# NEXT_PUBLIC_JUPITER_TOKEN_URL=https://token.jup.ag/all
# NEXT_PUBLIC_JUPITER_PRICE_URL=https://price.jup.ag/v6/price
# NEXT_PUBLIC_JUPITER_SWAP_URL=https://quote-api.jup.ag/v6/quote
# NEXT_PUBLIC_JUPITER_EXECUTE_URL=https://quote-api.jup.ag/v6/swap
# NEXT_PUBLIC_DEXSCREENER_URL=https://api.dexscreener.com/latest/dex/pairs/solana/
# NEXT_PUBLIC_GECKO_URL=https://api.geckoterminal.com/api/v2
# NEXT_PUBLIC_PUMPFUN_WS=wss://pumpportal.fun/api/data
# NEXT_PUBLIC_BIRDEYE_API_KEY=your_api_key
# NEXT_PUBLIC_HELIUS_RPC_URL=your_rpc_url
# NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
# NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
# NEXT_PUBLIC_BACKEND_URL=http://localhost:5000

# Run development server
npm run dev
# Visit http://localhost:3000
```

### Step 4: Backend Setup

```bash
# Navigate to backend directory
cd saturn/backend

# Install dependencies in batches
# Batch 1: Core
npm install express cors dotenv @anthropic-ai/sdk axios @supabase/supabase-js

# Batch 2: Dev
npm install -D nodemon

# Verify installation
npm list
```

### Step 5: Backend Configuration

```bash
# .env should contain:
# ANTHROPIC_API_KEY=sk-ant-...
# SUPABASE_URL=your_supabase_url
# SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
# BIRDEYE_API_KEY=your_birdeye_key
# HELIUS_RPC_URL=your_rpc_url
# HELIUS_API_KEY=your_helius_key
# GOOGLE_CLIENT_ID=...
# GOOGLE_CLIENT_SECRET=...
# FRONTEND_URL=http://localhost:3000
# PORT=5000

# Run development server
npm run dev
# Backend runs on http://localhost:5000
```

### Step 6: Test Locally

```bash
# Terminal 1 - Backend
cd saturn/backend
npm run dev
# Should see: "[Saturn Backend] Server running on port 5000"

# Terminal 2 - Frontend
cd saturn/frontend
npm run dev
# Should see: "- Local: http://localhost:3000"

# Test in browser:
# 1. Go to http://localhost:3000
# 2. See Saturn planet animation & live ticker
# 3. Click "ENTER TERMINAL"
# 4. See trading interface
# 5. Search for token (should fetch from DexScreener)
# 6. Click on token (should show chart, swap, AI signal)
```

## Phase 2: Database Setup (Supabase)

### Step 1: Create Tables

1. Go to Supabase dashboard → SQL Editor
2. Run this SQL:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  wallet_address TEXT,
  watchlist TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies - users can only see their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
```

### Step 2: Enable Google Auth

1. Supabase dashboard → Authentication → Providers
2. Enable Google OAuth
3. Add Google OAuth credentials from https://console.cloud.google.com
4. Copy Client ID/Secret to backend `.env`

## Phase 3: GitHub Setup

### Step 1: Initialize Git

```bash
cd saturn

# Initialize git repository
git init

# Create initial commit
git add .
git commit -m "Initial Saturn commit - complete trading terminal"

# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/saturn.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 2: Verify Deployment Files

Ensure these files exist for Vercel/Railway:
- `frontend/package.json` ✓
- `frontend/next.config.js` ✓
- `frontend/.env.local` (for local dev only - not committed)
- `backend/package.json` ✓
- `backend/.env` (for local dev only - not committed)

## Phase 4: Vercel Deployment (Frontend)

### Step 1: Connect to Vercel

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "Import Project"
4. Select your `saturn` repository
5. Set Project Name: `saturn-frontend`
6. Set Root Directory: `./frontend`

### Step 2: Configure Environment Variables

In Vercel dashboard, add these env vars:

```
NEXT_PUBLIC_JUPITER_TOKEN_URL=https://token.jup.ag/all
NEXT_PUBLIC_JUPITER_PRICE_URL=https://price.jup.ag/v6/price
NEXT_PUBLIC_JUPITER_SWAP_URL=https://quote-api.jup.ag/v6/quote
NEXT_PUBLIC_JUPITER_EXECUTE_URL=https://quote-api.jup.ag/v6/swap
NEXT_PUBLIC_DEXSCREENER_URL=https://api.dexscreener.com/latest/dex/pairs/solana/
NEXT_PUBLIC_GECKO_URL=https://api.geckoterminal.com/api/v2
NEXT_PUBLIC_PUMPFUN_WS=wss://pumpportal.fun/api/data
NEXT_PUBLIC_BIRDEYE_API_KEY=your_key_here
NEXT_PUBLIC_HELIUS_RPC_URL=your_rpc_url_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_BACKEND_URL=https://your-backend.up.railway.app
```

### Step 3: Deploy

1. Click "Deploy"
2. Wait for build (2-3 minutes)
3. Visit your Vercel URL (e.g., saturn-frontend.vercel.app)

## Phase 5: Railway Deployment (Backend)

### Step 1: Connect to Railway

1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Select "Deploy from GitHub repo"
5. Choose your `saturn` repository

### Step 2: Configure Build Settings

1. In Railway dashboard:
   - Root Directory: `backend`
   - Build Command: `npm install && npm run build` (or just `npm install` for Node)
   - Start Command: `npm start`

### Step 3: Add Environment Variables

In Railway dashboard, add:

```
ANTHROPIC_API_KEY=sk-ant-...
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
BIRDEYE_API_KEY=your_birdeye_key
HELIUS_RPC_URL=your_rpc_url
HELIUS_API_KEY=your_helius_key
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=https://saturn-frontend.vercel.app
PORT=5000
NODE_ENV=production
```

### Step 4: Deploy

1. Railway auto-deploys on git push
2. Monitor build logs in Railway dashboard
3. Get your Railway URL (e.g., saturn-backend-production.up.railway.app)

### Step 5: Update Frontend

1. Update `NEXT_PUBLIC_BACKEND_URL` in Vercel to your Railway URL
2. Trigger new Vercel deployment
3. Test AI signal generation (should call backend)

## Phase 6: Testing Checklist

- [ ] Landing page loads with Saturn animation
- [ ] Live ticker updates every 10 seconds
- [ ] Can click "ENTER TERMINAL"
- [ ] Terminal page shows all 8 panels
- [ ] Can search for tokens
- [ ] Can select token → chart loads
- [ ] Can see Pump.fun new tokens appearing
- [ ] Can connect Phantom wallet
- [ ] Wallet address displays correctly
- [ ] Swap interface shows Jupiter quotes
- [ ] AI signals load with BUY/SELL/HOLD
- [ ] Portfolio shows wallet holdings
- [ ] Activity feed shows recent trades

## Phase 7: Production Optimization

### Frontend (Vercel)

- [ ] Enable Edge Functions for API routes
- [ ] Set up automatic previews for pull requests
- [ ] Configure custom domain
- [ ] Enable analytics
- [ ] Set up error tracking (Sentry)

### Backend (Railway)

- [ ] Set up uptime monitoring
- [ ] Enable auto-scaling
- [ ] Configure backup database
- [ ] Set up error alerts
- [ ] Monitor API rate limits

## Troubleshooting

### Frontend Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# Or use different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

**Environment variables not loading:**
- Restart dev server after changing `.env.local`
- Verify all keys start with `NEXT_PUBLIC_`

### Backend Issues

**Port 5000 already in use:**
```bash
# Kill process
lsof -ti:5000 | xargs kill -9
# Or change PORT in .env
```

**Claude API errors:**
- Verify API key is correct
- Check API key has quota remaining
- See https://console.anthropic.com/overview

**CORS errors:**
- Ensure `FRONTEND_URL` in backend `.env` matches your frontend URL
- Check frontend is making requests to correct backend URL

### Deployment Issues

**Vercel build failing:**
- Check build logs in Vercel dashboard
- Verify all dependencies in `package.json`
- Test locally with `npm run build`

**Railway deployment failing:**
- Check Railway logs
- Verify environment variables are set
- Ensure `package.json` has correct scripts
- Test locally with `npm start`

## Useful Commands

```bash
# Frontend
cd saturn/frontend
npm run dev          # Development
npm run build        # Production build
npm run start        # Run production build
npm run lint         # Check code

# Backend
cd saturn/backend
npm run dev          # Development with nodemon
npm start            # Production
```

## Next Steps

1. ✅ Project structure created
2. ⚙️ Install dependencies locally
3. 🔑 Add API keys to `.env` files
4. 🚀 Deploy to Vercel & Railway
5. 📊 Monitor production analytics
6. 🎨 Customize design/features
7. 📈 Add more data sources/analysis

---

**For issues or questions, refer to the main README.md**

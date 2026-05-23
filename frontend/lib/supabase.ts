// frontend/lib/supabase.ts
// RUNS ON: Vercel (Frontend)
// PURPOSE: Supabase client for Google authentication and user data storage

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Sign in with Google
export async function signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window.location.origin}/terminal`
    }
  })
  if (error) throw error
  return data
}

// Sign out current user
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

// Get currently logged in user
export async function getCurrentUser() {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// Save user wallet address
export async function saveWalletAddress(userId: string, walletAddress: string) {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      wallet_address: walletAddress,
      updated_at: new Date().toISOString()
    })
  if (error) throw error
}

// Save user's token watchlist
export async function saveWatchlist(userId: string, tokens: string[]) {
  const { error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      watchlist: tokens,
      updated_at: new Date().toISOString()
    })
  if (error) throw error
}

// Get user profile
export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()
  if (error) return null
  return data
}

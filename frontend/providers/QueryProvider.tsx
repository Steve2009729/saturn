// frontend/providers/QueryProvider.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: React Query configuration for data fetching and caching
// MUST wrap WalletProvider
// Handles: stale time, cache time, auto refetch, retry logic

'use client'

import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5000,           // Keep data fresh for 5 seconds
      gcTime: 300000,             // Keep unused data in cache for 5 minutes
      refetchOnWindowFocus: true, // Refetch when user returns to tab
      retry: 3,                   // Retry failed requests 3 times
    }
  }
})

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

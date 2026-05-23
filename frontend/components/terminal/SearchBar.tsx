// frontend/components/terminal/SearchBar.tsx
// RUNS ON: Vercel (Frontend)
// PURPOSE: Search for tokens with DexScreener
// Shows dropdown with search results

'use client'

import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchTokens } from '@/lib/dexscreener'
import { Search } from 'lucide-react'
import type { TokenMarketData } from '@/types'

export function SearchBar({ onSelect }: { onSelect: (token: TokenMarketData) => void }) {
  const [search, setSearch] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const { data: results = [] } = useQuery({
    queryKey: ['search', search],
    queryFn: () => searchTokens(search),
    enabled: search.length > 1,
  })

  const handleSelect = useCallback((token: TokenMarketData) => {
    onSelect(token)
    setSearch('')
    setIsOpen(false)
  }, [onSelect])

  return (
    <div className="relative flex-1">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ash-400" />
        <input
          type="text"
          placeholder="Search tokens..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          className="w-full pl-10 pr-4 py-2 bg-ash-800 border border-ash-700 rounded-lg text-ash-100 placeholder-ash-500 focus:border-saturn-gold focus:outline-none"
        />
      </div>

      {isOpen && search.length > 1 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-ash-800 border border-ash-700 rounded-lg max-h-64 overflow-y-auto z-50">
          {results.length === 0 ? (
            <div className="p-4 text-ash-400 text-center">No tokens found</div>
          ) : (
            results.map((token) => (
              <button
                key={token.address}
                onClick={() => handleSelect(token)}
                className="w-full px-4 py-2 hover:bg-ash-700 text-left border-b border-ash-700 last:border-b-0 transition-colors"
              >
                <div className="font-mono text-sm text-saturn-gold">{token.symbol}</div>
                <div className="text-xs text-ash-400">{token.address}</div>
              </button>
            ))
          )}
        </div>
      )}

      {isOpen && (
        <button
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-40"
          aria-label="Close search"
        />
      )}
    </div>
  )
}

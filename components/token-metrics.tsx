'use client'

import { useEffect, useState } from 'react'
import useSWR from 'swr'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, DollarSign, Users, PieChart, BarChart, RefreshCw } from 'lucide-react'

interface TokenData {
  price: number
  change24h: number
  marketCap: number
  volume24h: number
  holders: number
  treasurySol: number
  treasuryUsd: number
  recentTransactions: Array<{
    address: string
    amount: number
    type: 'buy' | 'sell'
    time: string
  }>
  distribution: Array<{
    label: string
    value: number
    color: string
  }>
  timestamp: string
  isLive: boolean
}

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function TokenMetrics() {
  const { data, error, isLoading, mutate } = useSWR<TokenData>('/api/token-metrics', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
    revalidateOnFocus: true,
  })

  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted || isLoading) {
    return (
      <div className="glass-dark rounded-3xl p-6 spatial-layer-1 animate-pulse">
        <div className="h-8 bg-white/10 rounded w-1/3 mb-4" />
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="h-24 bg-white/10 rounded-2xl" />
          <div className="h-24 bg-white/10 rounded-2xl" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-12 bg-white/10 rounded-xl" />
          ))}
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
        <div className="text-center py-12">
          <div className="text-red-400 mb-2">Failed to load token data</div>
          <button
            onClick={() => mutate()}
            className="glass px-4 py-2 rounded-xl text-sm hover:bg-white/10 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    )
  }

  const tokenData = data

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">$KIRA Token</h2>
          <p className="text-white/60">
            {tokenData.isLive ? 'Live on-chain data' : 'Simulated data — token not yet deployed'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => mutate()}
            className="glass p-2 rounded-xl hover:bg-white/10 transition-colors"
            title="Refresh data"
          >
            <RefreshCw className="w-4 h-4 text-white/60" />
          </button>
          <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-neon-green" />
            <span className="text-sm">Pump.fun</span>
          </div>
        </div>
      </div>

      {/* Price and change */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="glass p-6 rounded-2xl">
          <div className="text-white/60 text-sm mb-2">Current Price</div>
          <div className="flex items-baseline gap-2">
            <div className="text-3xl font-bold text-white">${tokenData.price.toFixed(4)}</div>
            <div className={`flex items-center gap-1 ${tokenData.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {tokenData.change24h >= 0 ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              <span className="font-semibold">{Math.abs(tokenData.change24h)}%</span>
            </div>
          </div>
          <div className="text-white/40 text-sm mt-2">24h change</div>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="text-white/60 text-sm mb-2">Market Cap</div>
          <div className="text-3xl font-bold text-white">
            ${(tokenData.marketCap / 1000000).toFixed(1)}M
          </div>
          <div className="text-white/40 text-sm mt-2">Fully diluted</div>
        </div>
      </div>

      {/* Distribution chart */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Token Distribution</h3>
          <PieChart className="w-5 h-5 text-white/40" />
        </div>
        <div className="space-y-4">
          {tokenData.distribution.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${item.color}`} />
                <span className="text-white/80">{item.label}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-32 h-2 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
                  />
                </div>
                <span className="text-white font-semibold w-10 text-right">{item.value}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Treasury info */}
      <div className="glass p-4 rounded-2xl mb-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/60 text-sm mb-1">Treasury</div>
            <div className="text-xl font-bold text-white">{tokenData.treasurySol.toFixed(2)} SOL</div>
            <div className="text-white/40 text-sm">~${tokenData.treasuryUsd.toLocaleString()}</div>
          </div>
          <div className="p-3 rounded-xl bg-neon-purple/10 border border-neon-purple/20">
            <Users className="w-6 h-6 text-neon-purple" />
          </div>
        </div>
      </div>

      {/* Recent transactions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
          <BarChart className="w-5 h-5 text-white/40" />
        </div>
        <div className="space-y-3">
          {tokenData.recentTransactions.length > 0 ? (
            tokenData.recentTransactions.map((tx, index) => (
              <motion.div
                key={tx.address + index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center justify-between p-3 rounded-xl hover:glass transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    tx.type === 'buy' 
                      ? 'bg-green-500/10 border border-green-500/20' 
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}>
                    <div className={`text-xs font-bold ${
                      tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {tx.type === 'buy' ? 'BUY' : 'SELL'}
                    </div>
                  </div>
                  <div>
                    <div className="text-sm text-white/80">{tx.address}</div>
                    <div className="text-xs text-white/40">{tx.time}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className={`text-sm font-semibold ${
                    tx.type === 'buy' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {tx.type === 'buy' ? '+' : '-'}{tx.amount.toLocaleString()} $KIRA
                  </div>
                  <div className="text-xs text-white/40">
                    ${(tx.amount * tokenData.price).toLocaleString()}
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-6 text-white/40">
              No recent transactions
            </div>
          )}
        </div>
      </div>

      {/* Last updated */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-white/40">
          <span>Last updated: {new Date(tokenData.timestamp).toLocaleTimeString()}</span>
          <span className="flex items-center gap-1">
            <span className={`w-2 h-2 rounded-full ${tokenData.isLive ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
            {tokenData.isLive ? 'Live' : 'Demo Mode'}
          </span>
        </div>
      </div>
    </div>
  )
}
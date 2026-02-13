'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Activity, TrendingUp, Zap, Info } from 'lucide-react'

interface BondingCurveData {
  currentPrice: number
  marketCap: number
  solInCurve: number
  progressToGoal: number
  goalMarketCap: number
  estimatedLaunchPrice: number
  holders: number
  recentBuys: number
  recentSells: number
  volume24h: number
}

// Pump.fun bonding curve constants
const BONDING_CURVE_GOAL = 69420 // USD market cap to graduate to Raydium
const INITIAL_PRICE = 0.0000001 // Starting price in USD

export function PumpBondingCurve() {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  // Mock data - replace with real Pump.fun API data
  const data: BondingCurveData = useMemo(() => ({
    currentPrice: 0.000042,
    marketCap: 45000,
    solInCurve: 285.5,
    progressToGoal: 64.8,
    goalMarketCap: BONDING_CURVE_GOAL,
    estimatedLaunchPrice: 0.000069,
    holders: 342,
    recentBuys: 28,
    recentSells: 12,
    volume24h: 15230
  }), [])

  // Generate curve points for visualization
  const curvePoints = useMemo(() => {
    const points = []
    for (let i = 0; i <= 100; i += 2) {
      const x = i
      // Exponential bonding curve formula
      const y = Math.pow(x / 100, 2) * 100
      points.push({ x, y })
    }
    return points
  }, [])

  const formatCurrency = (val: number) => {
    if (val < 0.001) return `$${val.toFixed(8)}`
    if (val < 1) return `$${val.toFixed(4)}`
    return `$${val.toLocaleString()}`
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Pump.fun Bonding Curve</h2>
          <p className="text-white/60">Real-time bonding curve analytics</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Activity className="w-6 h-6 text-neon-green" />
        </div>
      </div>

      <div className="space-y-6">
        {/* Progress indicator */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white/60 text-sm">Progress to Raydium</span>
            <span className="text-neon-green font-bold">{data.progressToGoal.toFixed(1)}%</span>
          </div>
          <div className="h-3 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${data.progressToGoal}%` }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-neon-green to-neon-purple relative"
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse" />
            </motion.div>
          </div>
          <div className="flex justify-between mt-2 text-xs text-white/40">
            <span>$0</span>
            <span>${BONDING_CURVE_GOAL.toLocaleString()} goal</span>
          </div>
        </div>

        {/* Bonding curve visualization */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Price Curve
            </span>
            <span className="text-xs text-white/40">Exponential bonding curve</span>
          </div>
          
          <svg viewBox="0 0 100 60" className="w-full h-32">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((tick) => (
              <g key={tick}>
                <line
                  x1={tick}
                  y1="0"
                  x2={tick}
                  y2="60"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />
                <line
                  x1="0"
                  y1={60 - (tick / 100) * 60}
                  x2="100"
                  y2={60 - (tick / 100) * 60}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="0.5"
                />
              </g>
            ))}
            
            {/* Bonding curve */}
            <motion.path
              d={`M ${curvePoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${60 - p.y * 0.6}`).join(' ')}`}
              fill="none"
              stroke="url(#curveGradient)"
              strokeWidth="2"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeOut" }}
            />
            
            {/* Current position marker */}
            <motion.circle
              cx={data.progressToGoal}
              cy={60 - Math.pow(data.progressToGoal / 100, 2) * 60}
              r="3"
              fill="#00ff88"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 }}
            >
              <animate attributeName="opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite" />
            </motion.circle>
            
            {/* Goal marker */}
            <circle cx="100" cy="0" r="3" fill="#9333ea" />
            
            {/* Gradient definition */}
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#00ff88" />
                <stop offset="100%" stopColor="#9333ea" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Current Price</div>
            <div className="text-white font-bold">{formatCurrency(data.currentPrice)}</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Market Cap</div>
            <div className="text-white font-bold">${data.marketCap.toLocaleString()}</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">SOL in Curve</div>
            <div className="text-white font-bold">{data.solInCurve.toFixed(1)} SOL</div>
          </div>
          <div className="glass rounded-xl p-3">
            <div className="text-white/40 text-xs mb-1">Est. Launch Price</div>
            <div className="text-neon-purple font-bold">{formatCurrency(data.estimatedLaunchPrice)}</div>
          </div>
        </div>

        {/* Activity metrics */}
        <div className="glass rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-white/60 text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-400" />
              24h Activity
            </span>
            <span className="text-xs text-white/40">{data.holders} holders</span>
          </div>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-green-400 font-bold text-lg">+{data.recentBuys}</div>
              <div className="text-white/40 text-xs">Buys</div>
            </div>
            <div className="text-center border-x border-white/10">
              <div className="text-red-400 font-bold text-lg">-{data.recentSells}</div>
              <div className="text-white/40 text-xs">Sells</div>
            </div>
            <div className="text-center">
              <div className="text-white font-bold text-lg">${(data.volume24h / 1000).toFixed(1)}k</div>
              <div className="text-white/40 text-xs">Volume</div>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2 text-xs text-white/40">
          <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <p>
            When market cap reaches ${BONDING_CURVE_GOAL.toLocaleString()}, the token graduates to Raydium AMM. 
            Bonding curve ensures price discovery with exponential growth based on demand.
          </p>
        </div>
      </div>
    </div>
  )
}

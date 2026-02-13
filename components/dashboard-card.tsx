'use client'

import { LucideIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface DashboardCardProps {
  title: string
  value: string
  change: string
  icon: LucideIcon
  color: 'cyan' | 'purple' | 'pink' | 'blue' | 'green' | 'yellow'
  description: string
  trend: 'up' | 'down' | 'neutral'
}

const colorMap = {
  cyan: 'from-cyan-500 to-blue-500',
  purple: 'from-purple-500 to-pink-500',
  pink: 'from-pink-500 to-rose-500',
  blue: 'from-blue-500 to-cyan-500',
  green: 'from-green-500 to-emerald-500',
  yellow: 'from-yellow-500 to-amber-500',
}

const iconColorMap = {
  cyan: 'text-neon-cyan',
  purple: 'text-neon-purple',
  pink: 'text-neon-pink',
  blue: 'text-blue-400',
  green: 'text-green-400',
  yellow: 'text-yellow-400',
}

export function DashboardCard({
  title,
  value,
  change,
  icon: Icon,
  color,
  description,
  trend,
}: DashboardCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="glass-dark rounded-3xl p-6 spatial-layer-1"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-white/80 mb-1">{title}</h3>
          <p className="text-sm text-white/40">{description}</p>
        </div>
        <div className={cn(
          'p-3 rounded-2xl',
          `bg-gradient-to-br ${colorMap[color]} opacity-10`
        )}>
          <Icon className={cn('w-6 h-6', iconColorMap[color])} />
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <div className="text-4xl font-bold text-white mb-2">{value}</div>
        <div className={cn(
          'flex items-center gap-2 text-sm font-medium',
          trend === 'up' ? 'text-green-400' : 
          trend === 'down' ? 'text-red-400' : 
          'text-yellow-400'
        )}>
          <span>{change}</span>
          <span className="text-white/40">this month</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative h-2 rounded-full bg-white/10 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '75%' }}
          transition={{ duration: 1, delay: 0.2 }}
          className={cn(
            'absolute h-full rounded-full',
            `bg-gradient-to-r ${colorMap[color]}`
          )}
        />
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 -translate-y-1/2 translate-x-1/2">
        <div className={cn(
          'absolute inset-0 rounded-full blur-2xl',
          `bg-gradient-to-r ${colorMap[color]} opacity-20`
        )} />
      </div>
    </motion.div>
  )
}
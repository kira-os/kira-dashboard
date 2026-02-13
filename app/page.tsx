'use client'

import { motion } from 'framer-motion'
import { 
  Cpu, 
  Zap, 
  TrendingUp, 
  Users, 
  DollarSign, 
  Globe,
  Code,
  Server,
  BrainCircuit,
  Rocket,
  Sparkles,
  BarChart
} from 'lucide-react'
import { DashboardCard } from '@/components/dashboard-card'
import { LiveDataFeed } from '@/components/live-data-feed'
import { TokenMetrics } from '@/components/token-metrics'
import { SystemStatus } from '@/components/system-status'

export default function DashboardPage() {
  return (
    <div className="p-6 lg:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              <span className="neon-text">Interdimensional</span>
              <br />
              <span className="text-white">Control Center</span>
            </h1>
            <p className="text-white/60 text-lg">
              Real-time intelligence dashboard for Kira DAO
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-neon-cyan" />
              <span className="text-sm">Autonomous Mode</span>
            </div>
            <div className="glass px-4 py-2 rounded-2xl flex items-center gap-2">
              <Rocket className="w-4 h-4 text-neon-pink" />
              <span className="text-sm">24/7 Live</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main metrics grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <DashboardCard
            title="AI Intelligence"
            value="98.7%"
            change="+2.3%"
            icon={BrainCircuit}
            color="cyan"
            description="Cognitive processing efficiency"
            trend="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <DashboardCard
            title="Token Holders"
            value="1,247"
            change="+142"
            icon={Users}
            color="purple"
            description="Active DAO participants"
            trend="up"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <DashboardCard
            title="Treasury"
            value="$42.8K"
            change="+$3.2K"
            icon={DollarSign}
            color="green"
            description="Total assets under management"
            trend="up"
          />
        </motion.div>
      </div>

      {/* Secondary metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
        {[
          { icon: Cpu, label: 'Processing Power', value: '3.2 TFLOPS', color: 'blue' },
          { icon: Zap, label: 'Energy Efficiency', value: '94%', color: 'yellow' },
          { icon: TrendingUp, label: 'Revenue Growth', value: '28% MoM', color: 'pink' },
          { icon: Globe, label: 'Global Reach', value: '64 Countries', color: 'cyan' },
        ].map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <div className="glass p-6 rounded-3xl spatial-layer-1">
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-2xl bg-${metric.color}-500/10 border border-${metric.color}-500/20`}>
                  <metric.icon className={`w-6 h-6 text-neon-${metric.color}`} />
                </div>
                <div>
                  <div className="text-sm text-white/60">{metric.label}</div>
                  <div className="text-2xl font-bold text-white">{metric.value}</div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Token metrics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="lg:col-span-2"
        >
          <TokenMetrics />
        </motion.div>

        {/* Right column - System status */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <SystemStatus />
        </motion.div>
      </div>

      {/* Bottom row - Live data feed */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="mt-8"
      >
        <LiveDataFeed />
      </motion.div>

      {/* Floating action button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.7 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-8 right-8 glass p-4 rounded-2xl shadow-neon-lg spatial-layer-2"
      >
        <Code className="w-6 h-6 text-neon-cyan" />
      </motion.button>
    </div>
  )
}
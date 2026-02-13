'use client'

import { motion } from 'framer-motion'
import { Server, Cpu, Database, Network, Shield, Cloud, CheckCircle, AlertCircle } from 'lucide-react'

const systems = [
  { 
    name: 'AI Core', 
    status: 'operational', 
    icon: Cpu, 
    load: 78,
    color: 'from-cyan-500 to-blue-500'
  },
  { 
    name: 'Memory System', 
    status: 'operational', 
    icon: Database, 
    load: 65,
    color: 'from-purple-500 to-pink-500'
  },
  { 
    name: 'Network Layer', 
    status: 'degraded', 
    icon: Network, 
    load: 92,
    color: 'from-yellow-500 to-amber-500'
  },
  { 
    name: 'Security', 
    status: 'operational', 
    icon: Shield, 
    load: 99,
    color: 'from-green-500 to-emerald-500'
  },
  { 
    name: 'Cloud Infrastructure', 
    status: 'operational', 
    icon: Cloud, 
    load: 45,
    color: 'from-blue-500 to-cyan-500'
  },
  { 
    name: 'API Gateway', 
    status: 'operational', 
    icon: Server, 
    load: 82,
    color: 'from-pink-500 to-rose-500'
  },
]

export function SystemStatus() {
  const operationalCount = systems.filter(s => s.status === 'operational').length
  const totalSystems = systems.length
  const healthPercentage = Math.round((operationalCount / totalSystems) * 100)

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1 h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">System Health</h2>
          <p className="text-white/60">Real-time infrastructure status</p>
        </div>
        <div className="glass px-4 py-2 rounded-2xl">
          <div className="text-sm text-white/80">Overall Health</div>
          <div className="text-xl font-bold text-white">{healthPercentage}%</div>
        </div>
      </div>

      {/* Health indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-white/60 text-sm">System Uptime</span>
          <span className="text-white font-semibold">{healthPercentage}%</span>
        </div>
        <div className="relative h-3 rounded-full bg-white/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${healthPercentage}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className={`absolute h-full rounded-full ${
              healthPercentage >= 90 ? 'bg-gradient-to-r from-green-500 to-emerald-500' :
              healthPercentage >= 70 ? 'bg-gradient-to-r from-yellow-500 to-amber-500' :
              'bg-gradient-to-r from-red-500 to-rose-500'
            }`}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-1">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Systems list */}
      <div className="space-y-4">
        {systems.map((system, index) => (
          <motion.div
            key={system.name}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex items-center justify-between p-4 rounded-2xl hover:glass transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-xl bg-gradient-to-br ${system.color} opacity-10`}>
                <system.icon className={`w-5 h-5 ${
                  system.status === 'operational' ? 'text-green-400' : 'text-yellow-400'
                }`} />
              </div>
              <div>
                <div className="text-white font-medium">{system.name}</div>
                <div className="flex items-center gap-2 text-sm">
                  {system.status === 'operational' ? (
                    <>
                      <CheckCircle className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">Operational</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-3 h-3 text-yellow-400" />
                      <span className="text-yellow-400">Degraded</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            <div className="text-right">
              <div className="text-white font-semibold">{system.load}%</div>
              <div className="text-xs text-white/40">Load</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Status summary */}
      <div className="mt-6 pt-6 border-t border-white/10">
        <div className="grid grid-cols-2 gap-4">
          <div className="glass p-4 rounded-2xl">
            <div className="text-white/60 text-sm mb-1">Uptime</div>
            <div className="text-xl font-bold text-white">99.87%</div>
          </div>
          <div className="glass p-4 rounded-2xl">
            <div className="text-white/60 text-sm mb-1">Response Time</div>
            <div className="text-xl font-bold text-white">42ms</div>
          </div>
        </div>
        <div className="text-xs text-white/40 mt-4 text-center">
          Last updated: Just now • Auto-refresh: 5s
        </div>
      </div>
    </div>
  )
}
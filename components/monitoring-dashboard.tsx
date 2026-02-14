'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  TrendingDown,
  Activity,
  Shield,
  Clock
} from 'lucide-react'

interface Alert {
  id: string
  type: 'info' | 'warning' | 'critical'
  message: string
  timestamp: string
  acknowledged: boolean
  source: string
}

interface SystemMetric {
  name: string
  value: string
  change: number
  status: 'healthy' | 'warning' | 'critical'
}

export function MonitoringDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 'alert-1',
      type: 'warning',
      message: 'Treasury balance below 10 SOL threshold',
      timestamp: new Date().toISOString(),
      acknowledged: false,
      source: 'Treasury Monitor'
    }
  ])
  
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'Treasury Balance', value: '0 SOL', change: 0, status: 'warning' },
    { name: 'Active Proposals', value: '1', change: 0, status: 'healthy' },
    { name: 'Wallet Health', value: '100%', change: 0, status: 'healthy' },
    { name: 'System Uptime', value: '99.9%', change: 0, status: 'healthy' }
  ])

  const [isMonitoring, setIsMonitoring] = useState(false)

  // Simulate monitoring checks
  useEffect(() => {
    const interval = setInterval(() => {
      // In real implementation, this would check:
      // - Treasury balance
      // - Token price
      // - Failed transactions
      // - System health
      console.log('Running monitoring checks...')
    }, 30000) // Every 30 seconds

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (id: string) => {
    setAlerts(alerts.map(a => 
      a.id === id ? { ...a, acknowledged: true } : a
    ))
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="w-5 h-5 text-red-400" />
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-400" />
      default: return <Bell className="w-5 h-5 text-blue-400" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical': return 'border-red-500/30 bg-red-500/5'
      case 'warning': return 'border-yellow-500/30 bg-yellow-500/5'
      default: return 'border-blue-500/30 bg-blue-500/5'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />
      case 'critical': return <AlertTriangle className="w-4 h-4 text-red-400" />
      default: return <Activity className="w-4 h-4 text-white/40" />
    }
  }

  return (
    <div className="glass-dark rounded-3xl p-6 spatial-layer-1">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Monitoring & Alerts</h2>
          <p className="text-white/60">Real-time system health and notifications</p>
        </div>
        <div className="glass p-3 rounded-2xl">
          <Activity className="w-6 h-6 text-neon-green" />
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass rounded-xl p-4"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-white/60 text-sm">{metric.name}</span>
              {getStatusIcon(metric.status)}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-white">{metric.value}</span>
              {metric.change !== 0 && (
                <span className={`text-sm ${metric.change > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Active Alerts */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">Active Alerts</h3>
          <span className="text-sm text-white/40">
            {alerts.filter(a => !a.acknowledged).length} unacknowledged
          </span>
        </div>

        <div className="space-y-3 max-h-[300px] overflow-y-auto scrollbar-glass pr-2">
          {alerts.filter(a => !a.acknowledged).map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`glass rounded-xl p-4 border ${getAlertColor(alert.type)}`}
            >
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-white font-medium">{alert.message}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-white/40">
                    <Clock className="w-3 h-3" />
                    <span>{new Date(alert.timestamp).toLocaleTimeString()}</span>
                    <span>•</span>
                    <span>{alert.source}</span>
                  </div>
                </div>
                <button
                  onClick={() => acknowledgeAlert(alert.id)}
                  className="px-3 py-1 rounded-lg bg-white/10 text-white/60 text-sm hover:bg-white/20 transition-colors"
                >
                  Ack
                </button>
              </div>
            </motion.div>
          ))}

          {alerts.filter(a => !a.acknowledged).length === 0 && (
            <div className="text-center py-8 text-white/40">
              <CheckCircle className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No active alerts</p>
              <p className="text-sm">System operating normally</p>
            </div>
          )}
        </div>
      </div>

      {/* Monitoring Controls */}
      <div className="glass rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold text-white">Automated Monitoring</h3>
            <p className="text-sm text-white/60">Checks every 30 seconds</p>
          </div>
          <button
            onClick={() => setIsMonitoring(!isMonitoring)}
            className={`px-4 py-2 rounded-xl font-medium transition-colors ${
              isMonitoring 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                : 'bg-white/10 text-white/60 hover:bg-white/20'
            }`}
          >
            {isMonitoring ? 'Monitoring Active' : 'Start Monitoring'}
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Treasury balance tracking</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Failed transaction detection</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/60">
            <CheckCircle className="w-4 h-4 text-green-400" />
            <span>Multi-sig proposal alerts</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-white/40">
            <div className="w-4 h-4 rounded-full border border-white/20" />
            <span>Price volatility alerts (coming soon)</span>
          </div>
        </div>
      </div>

      {/* Webhook Configuration */}
      <div className="mt-6 p-4 glass rounded-xl border border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div>
            <div className="text-yellow-400 text-sm font-semibold mb-1">
              Webhook Alerts (Planned)
            </div>
            <p className="text-white/60 text-sm">
              Configure webhooks to receive alerts via Telegram, Discord, or email.
              This will enable real-time notifications for critical events.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

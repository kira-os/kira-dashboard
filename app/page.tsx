'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { StreamLayout } from '@/components/stream/stream_layout'
import { AvatarVideo } from '@/components/avatar_video'
import { TokenMetrics } from '@/components/token-metrics'
import { SystemStatus } from '@/components/system-status'
import { LiveDataFeed } from '@/components/live-data-feed'
import { MonitoringDashboard } from '@/components/monitoring-dashboard'

// Avatar configuration
const AVATAR_SESSION_URL = 'wss://gpu.kiraos.live/livekit' // Update with actual LiveKit URL
const AVATAR_ACCESS_TOKEN = '' // Will be fetched from API

export default function DashboardPage() {
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [streamerStatus, setStreamerStatus] = useState<'idle' | 'thinking' | 'responding'>('idle')

  // View components for stream layout
  const codeView = (
    <div className="h-full p-4 glass rounded-2xl overflow-auto">
      <h3 className="text-lg font-bold mb-4 neon-text">Active Development</h3>
      <div className="space-y-4">
        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="text-sm text-white/60 mb-2">Current Task</div>
          <div className="text-white">Building streaming dashboard with live avatar</div>
        </div>
        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="text-sm text-white/60 mb-2">Git Status</div>
          <div className="text-green-400 font-mono text-sm">main ● 21 files changed</div>
        </div>
        <div className="p-4 bg-black/30 rounded-xl border border-white/10">
          <div className="text-sm text-white/60 mb-2">Recent Commits</div>
          <div className="text-white/80 font-mono text-xs space-y-1">
            <div>• Add streaming layout component</div>
            <div>• Integrate avatar video</div>
            <div>• Update dashboard page</div>
          </div>
        </div>
      </div>
    </div>
  )

  const terminalView = (
    <div className="h-full p-4 glass rounded-2xl font-mono text-sm overflow-auto bg-black/50">
      <div className="text-green-400">$ npm run build</div>
      <div className="text-white/80 mt-2">
        Building Kira Dashboard...
        <br />
        ✓ Stream layout compiled
        <br />
        ✓ Avatar video ready
        <br />
        ✓ Dashboard updated
        <br />
        <br />
        <span className="text-neon-cyan">Ready for deployment</span>
      </div>
      <div className="mt-4 text-white/40">_</div>
    </div>
  )

  const desktopView = (
    <div className="h-full flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🖥️</div>
        <div className="text-white/60">Desktop streaming view</div>
        <div className="text-sm text-white/40 mt-2">VNC connection ready</div>
      </div>
    </div>
  )

  const avatarView = (
    <AvatarVideo
      session_url={AVATAR_SESSION_URL}
      access_token={AVATAR_ACCESS_TOKEN}
      is_speaking={isSpeaking}
      streamer_status={streamerStatus}
      responding_to_user="community"
    />
  )

  const chatView = (
    <div className="h-full p-4 glass rounded-2xl overflow-hidden flex flex-col">
      <h3 className="text-sm font-bold mb-3 text-white/80">Stream Chat</h3>
      <div className="flex-1 overflow-y-auto space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="text-neon-cyan">@user1:</span>
          <span className="text-white/70">Looking good!</span>
        </div>
        <div className="flex gap-2">
          <span className="text-neon-purple">@user2:</span>
          <span className="text-white/70">Is this live?</span>
        </div>
        <div className="flex gap-2">
          <span className="text-neon-pink">@kira:</span>
          <span className="text-white/70">Yes, fully autonomous now!</span>
        </div>
      </div>
    </div>
  )

  const statsView = (
    <div className="p-4 glass rounded-2xl">
      <h3 className="text-sm font-bold mb-3 text-white/80">System Stats</h3>
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-white/60">GPU VRAM</span>
          <span className="text-green-400">18.7 GB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">Avatar FPS</span>
          <span className="text-green-400">25</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">TTS Status</span>
          <span className="text-green-400">Active</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">API Status</span>
          <span className="text-green-400">Healthy</span>
        </div>
        <div className="flex justify-between">
          <span className="text-white/60">X Posts</span>
          <span className="text-neon-cyan">12 today</span>
        </div>
      </div>
    </div>
  )

  return (
    <div className="h-screen bg-[#07070C]">
      <StreamLayout
        desktopView={desktopView}
        codeView={codeView}
        terminalView={terminalView}
        avatarView={avatarView}
        chatView={chatView}
        statsView={statsView}
      />
    </div>
  )
}

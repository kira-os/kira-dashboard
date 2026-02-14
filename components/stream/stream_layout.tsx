'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './stream_layout.css';

interface StreamLayoutProps {
  desktopView: React.ReactNode;
  codeView: React.ReactNode;
  terminalView: React.ReactNode;
  avatarView: React.ReactNode;
  chatView: React.ReactNode;
  statsView: React.ReactNode;
}

type LayoutMode = 'code-focus' | 'terminal-focus' | 'split' | 'minimal' | 'theater';

export function StreamLayout({
  desktopView,
  codeView,
  terminalView,
  avatarView,
  chatView,
  statsView,
}: StreamLayoutProps) {
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('code-focus');
  const [showStats, setShowStats] = useState(true);
  const [glitchEffect, setGlitchEffect] = useState(false);

  // Random glitch effect
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.95) {
        setGlitchEffect(true);
        setTimeout(() => setGlitchEffect(false), 150);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`stream-layout ${glitchEffect ? 'glitch' : ''}`}>
      {/* Header with mode selector */}
      <header className="stream-header">
        <div className="stream-brand">
          <motion.div 
            className="logo-pulse"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span className="logo-text">KIRA</span>
            <span className="logo-suffix">OS</span>
          </motion.div>
          <div className="live-badge">
            <span className="live-dot" />
            <span className="live-text">LIVE</span>
          </div>
        </div>

        <div className="layout-modes">
          <LayoutModeButton 
            mode="code-focus" 
            current={layoutMode} 
            onClick={() => setLayoutMode('code-focus')}
            icon="</>"
            label="Code"
          />
          <LayoutModeButton 
            mode="terminal-focus" 
            current={layoutMode} 
            onClick={() => setLayoutMode('terminal-focus')}
            icon=">_"
            label="Terminal"
          />
          <LayoutModeButton 
            mode="split" 
            current={layoutMode} 
            onClick={() => setLayoutMode('split')}
            icon="◫"
            label="Split"
          />
          <LayoutModeButton 
            mode="theater" 
            current={layoutMode} 
            onClick={() => setLayoutMode('theater')}
            icon="□"
            label="Theater"
          />
          <LayoutModeButton 
            mode="minimal" 
            current={layoutMode} 
            onClick={() => setLayoutMode('minimal')}
            icon="○"
            label="Minimal"
          />
        </div>

        <div className="stream-controls">
          <button 
            className={`control-btn ${showStats ? 'active' : ''}`}
            onClick={() => setShowStats(!showStats)}
          >
            📊
          </button>
        </div>
      </header>

      {/* Main content area */}
      <main className="stream-main">
        <AnimatePresence mode="wait">
          {layoutMode === 'code-focus' && (
            <motion.div 
              key="code-focus"
              className="layout code-focus"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="primary-panel">
                {codeView}
              </div>
              <div className="secondary-panel">
                <div className="panel-section terminal-mini">
                  {terminalView}
                </div>
                <div className="panel-section chat-compact">
                  {chatView}
                </div>
              </div>
            </motion.div>
          )}

          {layoutMode === 'terminal-focus' && (
            <motion.div 
              key="terminal-focus"
              className="layout terminal-focus"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="primary-panel">
                {terminalView}
              </div>
              <div className="secondary-panel">
                <div className="panel-section code-mini">
                  {codeView}
                </div>
                <div className="panel-section chat-compact">
                  {chatView}
                </div>
              </div>
            </motion.div>
          )}

          {layoutMode === 'split' && (
            <motion.div 
              key="split"
              className="layout split"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="split-left">
                {codeView}
              </div>
              <div className="split-right">
                {terminalView}
              </div>
            </motion.div>
          )}

          {layoutMode === 'theater' && (
            <motion.div 
              key="theater"
              className="layout theater"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="theater-main">
                {desktopView}
              </div>
            </motion.div>
          )}

          {layoutMode === 'minimal' && (
            <motion.div 
              key="minimal"
              className="layout minimal"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <div className="minimal-content">
                {avatarView}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating avatar overlay - always visible */}
        <div className="floating-avatar">
          {avatarView}
        </div>

        {/* Stats overlay */}
        <AnimatePresence>
          {showStats && (
            <motion.div 
              className="stats-overlay"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
            >
              {statsView}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer with system info */}
      <footer className="stream-footer">
        <div className="system-status">
          <span className="status-item">
            <span className="status-dot active" />
            GPU: 18.7GB VRAM
          </span>
          <span className="status-item">
            <span className="status-dot active" />
            TTS: Active
          </span>
          <span className="status-item">
            <span className="status-dot active" />
            Avatar: 25 FPS
          </span>
        </div>
        <div className="stream-time">
          {new Date().toLocaleTimeString()}
        </div>
      </footer>
    </div>
  );
}

function LayoutModeButton({ 
  mode, 
  current, 
  onClick, 
  icon, 
  label 
}: { 
  mode: LayoutMode; 
  current: LayoutMode; 
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      className={`layout-mode-btn ${current === mode ? 'active' : ''}`}
      onClick={onClick}
    >
      <span className="mode-icon">{icon}</span>
      <span className="mode-label">{label}</span>
    </button>
  );
}

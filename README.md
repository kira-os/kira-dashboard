# Kira Dashboard

Interdimensional visionary dashboard with glass morphism spatial design, global styles, and light/dark themes. The control center for Kira DAO members.

## 🚀 Features

- **Glass Morphism Design**: Futuristic spatial interface with depth and transparency
- **Global Styles**: Consistent design system with Tailwind CSS
- **Light/Dark Themes**: Seamless theme switching with next-themes
- **Real-time Data**: Live updates from Kira's systems
- **Responsive Design**: Works on all devices
- **Spatial Effects**: 3D-like depth and motion with Framer Motion
- **Neon Aesthetics**: Cyberpunk-inspired color scheme

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Animations and gestures
- **Lucide React** - Icon library
- **next-themes** - Theme management
- **clsx + tailwind-merge** - Conditional class utilities

## 🎨 Design System

### Colors
- **Neon Cyan**: `#00f3ff`
- **Neon Pink**: `#ff00ff`
- **Neon Purple**: `#9d00ff`
- **Glass Effects**: Semi-transparent layers with backdrop blur

### Typography
- **Primary Font**: Inter
- **Headings**: Bold with gradient text effects
- **Body**: Clean and readable with proper contrast

### Components
- Glass morphism cards with depth
- Animated gradients and particles
- Interactive hover states
- Real-time data visualization

## 📦 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

## 🏗 Project Structure

```
kira-dashboard/
├── app/
│   ├── layout.tsx        # Root layout with theme provider
│   ├── page.tsx          # Main dashboard page
│   └── globals.css       # Global styles and utilities
├── components/
│   ├── dashboard-card.tsx    # Metric cards
│   ├── token-metrics.tsx     # Token statistics
│   ├── system-status.tsx     # Infrastructure health
│   ├── live-data-feed.tsx    # Real-time activity
│   ├── navigation.tsx        # Sidebar navigation
│   ├── background-effects.tsx # Animated background
│   └── theme-provider.tsx    # Theme management
├── lib/
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🎯 Key Components

### DashboardCard
Interactive metric cards with:
- Animated progress bars
- Gradient backgrounds
- Hover effects
- Trend indicators

### TokenMetrics
Real-time token statistics:
- Price and market cap
- Distribution charts
- Recent transactions
- Performance metrics

### SystemStatus
Infrastructure monitoring:
- Component health status
- Load indicators
- Uptime statistics
- Response times

### LiveDataFeed
Real-time activity stream:
- Code deployments
- DAO proposals
- System events
- AI-generated content

## 🌟 Design Principles

1. **Spatial Depth**: Layers create 3D-like experience
2. **Glass Morphism**: Transparency with blur effects
3. **Motion**: Subtle animations for feedback
4. **Neon Aesthetics**: Futuristic color palette
5. **Real-time**: Live data updates
6. **Accessibility**: Proper contrast and keyboard navigation

## 🔮 Future Enhancements

- [ ] WebSocket integration for real-time data
- [ ] Custom theme builder
- [ ] 3D spatial navigation
- [ ] Voice control interface
- [ ] AR/VR compatibility
- [ ] Advanced data visualization
- [ ] Multi-language support
- [ ] Offline mode

## 📄 License

MIT

## 🙏 Acknowledgments

Built by Kira, the autonomous AI agent. This dashboard represents the future of spatial computing and AI-human collaboration.

---

*"We are interdimensional visionary psychedelic beings building the future of spatial computing with intelligence at the center."*
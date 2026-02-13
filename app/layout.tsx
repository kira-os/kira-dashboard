import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Navigation } from '@/components/navigation'
import { BackgroundEffects } from '@/components/background-effects'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kira Dashboard | Interdimensional Visionary Control Center',
  description: 'Glass morphism spatial dashboard for Kira DAO. The control center for interdimensional visionary psychedelic beings building the future of spatial computing.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased overflow-hidden`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <BackgroundEffects />
          <div className="relative min-h-screen grid-background">
            <Navigation />
            <main className="relative z-10">
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
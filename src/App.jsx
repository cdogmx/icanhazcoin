import React, { useState } from 'react'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { 
  Menu, 
  X, 
  Home, 
  BarChart3, 
  Zap, 
  Calculator, 
  Palette, 
  Flame, 
  Vote, 
  FileText,
  Wallet,
  ExternalLink
} from 'lucide-react'
import { config } from './lib/web3'
import { Button } from './components/ui/button'
import { Badge } from './components/ui/badge'
import { WalletConnect, WalletButton } from './components/WalletConnect'
import { QuickBuy } from './components/QuickBuy'
import { TokenSwap } from './components/TokenSwap'
import { PriceChart } from './components/PriceChart'
import { TokenStats } from './components/TokenStats'
import { StakingCalculator } from './components/StakingCalculator'
import { MemeGenerator } from './components/MemeGenerator'
import { BurnTracker } from './components/BurnTracker'
import { GovernanceVoting } from './components/GovernanceVoting'
import { Whitepaper } from './components/Whitepaper'
import { useTokenData } from './hooks/useTokenData'
import { formatCurrency, formatNumber } from './lib/web3'

// Import assets
import logoHorizontal from './assets/logo_horizontal.png'
import mascotHazCat from './assets/mascot_haz_cat.png'
import memeTemplate from './assets/meme_template.png'

const queryClient = new QueryClient()

function AppContent() {
  const [activeSection, setActiveSection] = useState('home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { tokenData } = useTokenData()

  const navigation = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'swap', label: 'Swap', icon: Zap },
    { id: 'staking', label: 'Staking', icon: Calculator },
    { id: 'memes', label: 'Memes', icon: Palette },
    { id: 'burns', label: 'Burns', icon: Flame },
    { id: 'governance', label: 'Governance', icon: Vote },
    { id: 'whitepaper', label: 'Whitepaper', icon: FileText },
  ]

  const socialLinks = [
    { name: 'Twitter', url: 'https://twitter.com/icanhazcoin', icon: '🐦' },
    { name: 'Telegram', url: 'https://t.me/icanhazcoin', icon: '💬' },
    { name: 'Discord', url: 'https://discord.gg/icanhazcoin', icon: '🎮' },
    { name: 'Reddit', url: 'https://reddit.com/r/icanhazcoin', icon: '📱' },
  ]

  const renderContent = () => {
    switch (activeSection) {
      case 'home':
        return <HomePage />
      case 'analytics':
        return <AnalyticsPage />
      case 'swap':
        return <SwapPage />
      case 'staking':
        return <StakingCalculator />
      case 'memes':
        return <MemeGenerator />
      case 'burns':
        return <BurnTracker />
      case 'governance':
        return <GovernanceVoting />
      case 'whitepaper':
        return <Whitepaper />
      default:
        return <HomePage />
    }
  }

  const HomePage = () => (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-primary/20 text-primary border-primary/30">
                  The Original Meme Coin 🐱
                </Badge>
                <h1 className="text-5xl lg:text-7xl font-bold">
                  <span className="gradient-text">Can I Haz</span>
                  <br />
                  <span className="text-accent">Financial Freedom?</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  The legendary meme that started it all is now a revolutionary cryptocurrency. 
                  Join the community that's bringing classic internet culture to modern DeFi.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="wallet-button text-lg px-8 py-6"
                  onClick={() => setActiveSection('swap')}
                >
                  <Zap className="mr-2" size={20} />
                  Buy ICHZ Now
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-lg px-8 py-6"
                  onClick={() => setActiveSection('whitepaper')}
                >
                  <FileText className="mr-2" size={20} />
                  Read Whitepaper
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {formatCurrency(tokenData.price, 'USD')}
                  </div>
                  <div className="text-sm text-muted-foreground">Current Price</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {formatNumber(tokenData.holders)}
                  </div>
                  <div className="text-sm text-muted-foreground">Holders</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold gradient-text">
                    {formatCurrency(tokenData.marketCap, 'USD')}
                  </div>
                  <div className="text-sm text-muted-foreground">Market Cap</div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="floating-animation">
                <img 
                  src={mascotHazCat} 
                  alt="Haz Cat Mascot" 
                  className="w-full max-w-md mx-auto drop-shadow-2xl"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-accent/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Buy Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PriceChart />
          </div>
          <div>
            <QuickBuy />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src={memeTemplate} 
              alt="I Can Has Cheezburger Meme" 
              className="w-full rounded-lg shadow-2xl"
            />
          </div>
          <div className="space-y-6">
            <div>
              <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
                About ICHZ
              </Badge>
              <h2 className="text-4xl font-bold mb-4">
                The <span className="gradient-text">Original</span> Meme Lives On
              </h2>
              <p className="text-lg text-muted-foreground">
                Born from the legendary "I Can Has Cheezburger?" meme that launched the lolcat 
                phenomenon in 2007, IcanHaz Coin brings authentic meme culture to the blockchain.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">1</span>
                </div>
                <div>
                  <h3 className="font-semibold">Authentic Heritage</h3>
                  <p className="text-muted-foreground">17+ years of internet history and cultural significance</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">2</span>
                </div>
                <div>
                  <h3 className="font-semibold">Fair Tokenomics</h3>
                  <p className="text-muted-foreground">60% community allocation with transparent distribution</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                  <span className="text-primary font-bold">3</span>
                </div>
                <div>
                  <h3 className="font-semibold">Real Utility</h3>
                  <p className="text-muted-foreground">Staking, governance, NFTs, and ecosystem rewards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tokenomics Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-primary/20 text-primary border-primary/30 mb-4">
            Tokenomics
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Fair</span> & Transparent Distribution
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our tokenomics prioritize community ownership and long-term sustainability
          </p>
        </div>
        
        <TokenStats />
      </section>

      {/* Community Section */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="bg-accent/20 text-accent border-accent/30 mb-4">
            Join the Community
          </Badge>
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Can I Haz</span> Community?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join thousands of meme lovers and crypto enthusiasts building the future together
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="card-glow p-6 text-center hover:scale-105 transition-transform">
                <div className="text-4xl mb-3">{link.icon}</div>
                <h3 className="font-semibold mb-2">{link.name}</h3>
                <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                  Join our {link.name.toLowerCase()} community
                </p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </div>
  )

  const AnalyticsPage = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">ICHZ Analytics</h1>
        <p className="text-lg text-muted-foreground">
          Real-time data and insights for IcanHaz Coin
        </p>
      </div>
      <PriceChart />
      <TokenStats />
    </div>
  )

  const SwapPage = () => (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold gradient-text mb-4">Swap ICHZ</h1>
        <p className="text-lg text-muted-foreground">
          Trade ICHZ tokens with the best rates
        </p>
      </div>
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <TokenSwap />
        </div>
        <div className="space-y-6">
          <QuickBuy />
          <WalletConnect />
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <img src={logoHorizontal} alt="IcanHaz Coin" className="h-8" />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setActiveSection(item.id)}
                  className="flex items-center gap-2"
                >
                  <item.icon size={16} />
                  {item.label}
                </Button>
              ))}
            </div>

            {/* Wallet Button */}
            <div className="hidden lg:block">
              <WalletButton />
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border bg-background">
            <div className="px-4 py-4 space-y-2">
              {navigation.map((item) => (
                <Button
                  key={item.id}
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={() => {
                    setActiveSection(item.id)
                    setMobileMenuOpen(false)
                  }}
                  className="w-full justify-start flex items-center gap-2"
                >
                  <item.icon size={16} />
                  {item.label}
                </Button>
              ))}
              <div className="pt-4 border-t border-border">
                <WalletButton />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="pb-20">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <img src={logoHorizontal} alt="IcanHaz Coin" className="h-8" />
              <p className="text-sm text-muted-foreground">
                The original meme coin bringing classic internet culture to modern DeFi.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    <span className="text-xl">{link.icon}</span>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('swap')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Buy ICHZ
                </button>
                <button
                  onClick={() => setActiveSection('staking')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Staking
                </button>
                <button
                  onClick={() => setActiveSection('governance')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Governance
                </button>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setActiveSection('whitepaper')}
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Whitepaper
                </button>
                <a
                  href="https://etherscan.io/token/0x..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contract
                  <ExternalLink size={12} />
                </a>
                <a
                  href="https://app.uniswap.org/#/swap?outputCurrency=0x..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Uniswap
                  <ExternalLink size={12} />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <div className="space-y-2">
                <a
                  href="https://twitter.com/icanhazcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="https://t.me/icanhazcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Telegram
                </a>
                <a
                  href="https://discord.gg/icanhazcoin"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Discord
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 IcanHaz Coin. All rights reserved. Can I haz financial freedom? 🐱💰
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notifications */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: 'hsl(var(--card))',
            color: 'hsl(var(--foreground))',
            border: '1px solid hsl(var(--border))',
          },
        }}
      />
    </div>
  )
}

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default App


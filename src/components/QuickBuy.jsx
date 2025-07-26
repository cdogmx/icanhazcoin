import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Zap, ExternalLink, TrendingUp } from 'lucide-react'
import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import { Badge } from './ui/badge'
import { useTokenData } from '../hooks/useTokenData'
import { formatCurrency, formatNumber } from '../lib/web3'
import toast from 'react-hot-toast'

export const QuickBuy = () => {
  const { isConnected } = useAccount()
  const { tokenData } = useTokenData()
  const [selectedAmount, setSelectedAmount] = useState(0.1)

  const quickAmounts = [0.1, 0.5, 1.0, 2.0]

  const handleQuickBuy = async (ethAmount) => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    const ichzAmount = (ethAmount * 3200) / tokenData.price // Mock calculation
    
    toast.loading(`Buying ${formatNumber(ichzAmount)} ICHZ for ${ethAmount} ETH...`, { id: 'quickbuy' })
    
    // Simulate transaction
    setTimeout(() => {
      toast.success(`Successfully purchased ${formatNumber(ichzAmount)} ICHZ!`, { id: 'quickbuy' })
    }, 2000)
  }

  const getIchzAmount = (ethAmount) => {
    return (ethAmount * 3200) / tokenData.price // Mock ETH price $3200
  }

  return (
    <Card className="bg-gradient-to-br from-primary/10 to-accent/10 border-primary/20">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Zap className="text-accent" size={20} />
          <h3 className="text-lg font-bold">Quick Buy ICHZ</h3>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30 ml-auto">
            <TrendingUp size={12} className="mr-1" />
            +{tokenData.priceChange24h.toFixed(2)}%
          </Badge>
        </div>

        <div className="space-y-4">
          {/* Current Price */}
          <div className="text-center p-3 bg-background/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Current Price</div>
            <div className="text-2xl font-bold gradient-text">
              {formatCurrency(tokenData.price, 'USD')}
            </div>
            <div className="text-xs text-muted-foreground">per ICHZ</div>
          </div>

          {/* Quick Amount Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {quickAmounts.map((amount) => (
              <Button
                key={amount}
                variant={selectedAmount === amount ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedAmount(amount)}
                className="flex flex-col h-auto py-3"
              >
                <span className="text-xs font-medium">{amount} ETH</span>
                <span className="text-[10px] text-muted-foreground">
                  {formatNumber(getIchzAmount(amount))} ICHZ
                </span>
              </Button>
            ))}
          </div>

          {/* Selected Amount Display */}
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">You pay:</span>
              <span className="font-semibold">{selectedAmount} ETH</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">You receive:</span>
              <span className="font-semibold text-accent">
                {formatNumber(getIchzAmount(selectedAmount))} ICHZ
              </span>
            </div>
          </div>

          {/* Buy Button */}
          <Button
            onClick={() => handleQuickBuy(selectedAmount)}
            disabled={!isConnected}
            className="w-full wallet-button flex items-center gap-2"
          >
            <Zap size={16} />
            {isConnected ? `Buy ${formatNumber(getIchzAmount(selectedAmount))} ICHZ` : 'Connect Wallet to Buy'}
          </Button>

          {/* Links */}
          <div className="flex justify-between text-xs text-muted-foreground">
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <span>Advanced Swap</span>
              <ExternalLink size={10} />
            </button>
            <button className="flex items-center gap-1 hover:text-primary transition-colors">
              <span>View Chart</span>
              <ExternalLink size={10} />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default QuickBuy


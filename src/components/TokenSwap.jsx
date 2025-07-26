import React, { useState, useEffect } from 'react'
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi'
import { parseEther, formatEther } from 'viem'
import { ArrowUpDown, Zap, AlertCircle, ExternalLink, Settings } from 'lucide-react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Badge } from './ui/badge'
import { Slider } from './ui/slider'
import { Switch } from './ui/switch'
import { Label } from './ui/label'
import { ICANHAZ_CONTRACT, UNISWAP_V2_ROUTER, WETH_ADDRESS, formatTokenAmount, parseTokenAmount } from '../lib/web3'
import { useTokenData } from '../hooks/useTokenData'
import toast from 'react-hot-toast'

export const TokenSwap = () => {
  const { address, isConnected } = useAccount()
  const { tokenData } = useTokenData()
  const { writeContract } = useWriteContract()
  
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [fromToken, setFromToken] = useState('ETH')
  const [toToken, setToToken] = useState('ICHZ')
  const [slippage, setSlippage] = useState(2)
  const [isExactIn, setIsExactIn] = useState(true)
  const [showSettings, setShowSettings] = useState(false)
  const [autoSlippage, setAutoSlippage] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  // Calculate swap amounts
  useEffect(() => {
    if (fromAmount && tokenData.price) {
      if (fromToken === 'ETH' && toToken === 'ICHZ') {
        // ETH to ICHZ
        const ethPrice = 3200 // Mock ETH price in USD
        const ethValue = parseFloat(fromAmount) * ethPrice
        const ichzAmount = ethValue / tokenData.price
        setToAmount(ichzAmount.toFixed(0))
      } else if (fromToken === 'ICHZ' && toToken === 'ETH') {
        // ICHZ to ETH
        const ethPrice = 3200 // Mock ETH price in USD
        const ichzValue = parseFloat(fromAmount) * tokenData.price
        const ethAmount = ichzValue / ethPrice
        setToAmount(ethAmount.toFixed(6))
      }
    } else {
      setToAmount('')
    }
  }, [fromAmount, fromToken, toToken, tokenData.price])

  const handleSwapTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const handleMaxClick = () => {
    // Mock max balance - in real implementation, would use actual wallet balance
    if (fromToken === 'ETH') {
      setFromAmount('0.1') // Mock ETH balance
    } else {
      setFromAmount('1000000') // Mock ICHZ balance
    }
  }

  const handleSwap = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first')
      return
    }

    if (!fromAmount || !toAmount) {
      toast.error('Please enter an amount to swap')
      return
    }

    setIsLoading(true)
    
    try {
      // Mock swap transaction - in real implementation, would call Uniswap router
      toast.loading('Preparing swap transaction...', { id: 'swap' })
      
      // Simulate transaction delay
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success(`Successfully swapped ${fromAmount} ${fromToken} for ${toAmount} ${toToken}!`, { id: 'swap' })
      
      // Reset form
      setFromAmount('')
      setToAmount('')
      
    } catch (error) {
      console.error('Swap error:', error)
      toast.error('Swap failed. Please try again.', { id: 'swap' })
    } finally {
      setIsLoading(false)
    }
  }

  const getPriceImpact = () => {
    // Mock price impact calculation
    const amount = parseFloat(fromAmount) || 0
    if (amount > 1000) return 5.2
    if (amount > 100) return 2.1
    if (amount > 10) return 0.8
    return 0.1
  }

  const getMinReceived = () => {
    if (!toAmount) return '0'
    const amount = parseFloat(toAmount)
    const minAmount = amount * (1 - slippage / 100)
    return minAmount.toFixed(toToken === 'ICHZ' ? 0 : 6)
  }

  return (
    <Card className="swap-container max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Zap className="text-accent" size={20} />
            Swap Tokens
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowSettings(!showSettings)}
            className="h-8 w-8 p-0"
          >
            <Settings size={16} />
          </Button>
        </div>
        
        {showSettings && (
          <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-slippage">Auto Slippage</Label>
              <Switch
                id="auto-slippage"
                checked={autoSlippage}
                onCheckedChange={setAutoSlippage}
              />
            </div>
            
            {!autoSlippage && (
              <div className="space-y-2">
                <Label>Slippage Tolerance: {slippage}%</Label>
                <Slider
                  value={[slippage]}
                  onValueChange={(value) => setSlippage(value[0])}
                  max={10}
                  min={0.1}
                  step={0.1}
                  className="w-full"
                />
                <div className="flex gap-2">
                  {[0.5, 1, 2, 5].map((value) => (
                    <Button
                      key={value}
                      variant="outline"
                      size="sm"
                      onClick={() => setSlippage(value)}
                      className="text-xs"
                    >
                      {value}%
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* From Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">From</span>
            <span className="text-muted-foreground">Balance: 0.1 {fromToken}</span>
          </div>
          
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="pr-24 text-lg h-14"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleMaxClick}
                className="text-xs h-6 px-2"
              >
                MAX
              </Button>
              <Badge variant="secondary" className="font-semibold">
                {fromToken}
              </Badge>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwapTokens}
            className="h-10 w-10 rounded-full border-2 border-border hover:border-primary transition-colors"
          >
            <ArrowUpDown size={16} />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">To</span>
            <span className="text-muted-foreground">Balance: 0 {toToken}</span>
          </div>
          
          <div className="relative">
            <Input
              type="number"
              placeholder="0.0"
              value={toAmount}
              readOnly
              className="pr-16 text-lg h-14 bg-muted/50"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2">
              <Badge variant="secondary" className="font-semibold">
                {toToken}
              </Badge>
            </div>
          </div>
        </div>

        {/* Swap Details */}
        {fromAmount && toAmount && (
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Rate</span>
              <span>1 {fromToken} = {(parseFloat(toAmount) / parseFloat(fromAmount)).toFixed(6)} {toToken}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Price Impact</span>
              <span className={getPriceImpact() > 3 ? 'text-red-400' : 'text-green-400'}>
                {getPriceImpact().toFixed(2)}%
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Min Received</span>
              <span>{getMinReceived()} {toToken}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network Fee</span>
              <span>~$5.20</span>
            </div>
          </div>
        )}

        {/* Warnings */}
        {getPriceImpact() > 3 && (
          <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-sm">
            <AlertCircle size={16} className="text-red-400" />
            <span className="text-red-400">High price impact! Consider reducing your swap amount.</span>
          </div>
        )}

        {/* Swap Button */}
        <Button
          onClick={handleSwap}
          disabled={!isConnected || !fromAmount || !toAmount || isLoading}
          className="w-full h-12 text-lg font-semibold wallet-button"
        >
          {!isConnected ? 'Connect Wallet' : 
           isLoading ? 'Swapping...' : 
           `Swap ${fromToken} for ${toToken}`}
        </Button>

        {/* Additional Info */}
        <div className="text-center text-xs text-muted-foreground">
          <p>Powered by Uniswap V2</p>
          <p className="flex items-center justify-center gap-1 mt-1">
            <span>View on Etherscan</span>
            <ExternalLink size={12} />
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

export default TokenSwap


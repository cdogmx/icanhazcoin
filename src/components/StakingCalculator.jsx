import React, { useState, useEffect } from 'react'
import { Calculator, TrendingUp, Clock, Coins, Info } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Slider } from './ui/slider'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { formatNumber, formatCurrency } from '../lib/web3'
import { useTokenData } from '../hooks/useTokenData'

export const StakingCalculator = () => {
  const { tokenData } = useTokenData()
  const [stakingAmount, setStakingAmount] = useState(1000000)
  const [stakingPeriod, setStakingPeriod] = useState(30)
  const [apy, setApy] = useState(25)
  const [compounding, setCompounding] = useState('daily')
  const [results, setResults] = useState({})

  // Staking periods with different APY rates
  const stakingPeriods = [
    { days: 7, apy: 15, label: '7 Days', bonus: '15% APY' },
    { days: 30, apy: 25, label: '30 Days', bonus: '25% APY' },
    { days: 90, apy: 40, label: '90 Days', bonus: '40% APY' },
    { days: 180, apy: 60, label: '180 Days', bonus: '60% APY' },
    { days: 365, apy: 100, label: '1 Year', bonus: '100% APY' },
  ]

  const compoundingOptions = [
    { value: 'daily', label: 'Daily', multiplier: 365 },
    { value: 'weekly', label: 'Weekly', multiplier: 52 },
    { value: 'monthly', label: 'Monthly', multiplier: 12 },
  ]

  useEffect(() => {
    calculateRewards()
  }, [stakingAmount, stakingPeriod, apy, compounding])

  const calculateRewards = () => {
    const principal = stakingAmount
    const rate = apy / 100
    const time = stakingPeriod / 365
    const compound = compoundingOptions.find(c => c.value === compounding)?.multiplier || 365

    // Compound interest formula: A = P(1 + r/n)^(nt)
    const finalAmount = principal * Math.pow(1 + rate / compound, compound * time)
    const totalRewards = finalAmount - principal
    const dailyRewards = totalRewards / stakingPeriod
    const monthlyRewards = dailyRewards * 30

    // Calculate USD values
    const principalUSD = principal * tokenData.price
    const rewardsUSD = totalRewards * tokenData.price
    const dailyRewardsUSD = dailyRewards * tokenData.price
    const monthlyRewardsUSD = monthlyRewards * tokenData.price

    setResults({
      finalAmount,
      totalRewards,
      dailyRewards,
      monthlyRewards,
      principalUSD,
      rewardsUSD,
      dailyRewardsUSD,
      monthlyRewardsUSD,
      roi: (totalRewards / principal) * 100
    })
  }

  const handlePeriodSelect = (period) => {
    setStakingPeriod(period.days)
    setApy(period.apy)
  }

  return (
    <Card className="card-glow max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="text-primary" size={20} />
          ICHZ Staking Calculator
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Calculate your potential rewards from staking ICHZ tokens
        </p>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="calculator" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="pools">Staking Pools</TabsTrigger>
          </TabsList>

          <TabsContent value="calculator" className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Input Section */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="staking-amount">Staking Amount (ICHZ)</Label>
                  <Input
                    id="staking-amount"
                    type="number"
                    value={stakingAmount}
                    onChange={(e) => setStakingAmount(Number(e.target.value))}
                    className="text-lg"
                  />
                  <div className="text-sm text-muted-foreground">
                    ≈ {formatCurrency(stakingAmount * tokenData.price, 'USD')}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Staking Period</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {stakingPeriods.map((period) => (
                      <Button
                        key={period.days}
                        variant={stakingPeriod === period.days ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePeriodSelect(period)}
                        className="flex flex-col h-auto py-3"
                      >
                        <span className="font-semibold">{period.label}</span>
                        <span className="text-xs text-muted-foreground">{period.bonus}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Custom Period (Days): {stakingPeriod}</Label>
                  <Slider
                    value={[stakingPeriod]}
                    onValueChange={(value) => setStakingPeriod(value[0])}
                    max={365}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>APY: {apy}%</Label>
                  <Slider
                    value={[apy]}
                    onValueChange={(value) => setApy(value[0])}
                    max={150}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Compounding Frequency</Label>
                  <div className="flex gap-2">
                    {compoundingOptions.map((option) => (
                      <Button
                        key={option.value}
                        variant={compounding === option.value ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCompounding(option.value)}
                      >
                        {option.label}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Results Section */}
              <div className="space-y-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-center">
                    <div className="text-sm text-muted-foreground">Total After {stakingPeriod} Days</div>
                    <div className="text-3xl font-bold gradient-text">
                      {formatNumber(results.finalAmount)} ICHZ
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ≈ {formatCurrency((results.finalAmount || 0) * tokenData.price, 'USD')}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Total Rewards</div>
                    <div className="text-lg font-bold text-green-400">
                      +{formatNumber(results.totalRewards)} ICHZ
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ {formatCurrency(results.rewardsUSD, 'USD')}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">ROI</div>
                    <div className="text-lg font-bold text-accent">
                      {results.roi?.toFixed(2)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Return on Investment
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Daily Rewards</div>
                    <div className="text-lg font-bold">
                      {formatNumber(results.dailyRewards)} ICHZ
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ {formatCurrency(results.dailyRewardsUSD, 'USD')}
                    </div>
                  </div>

                  <div className="p-3 bg-muted/50 rounded-lg text-center">
                    <div className="text-sm text-muted-foreground">Monthly Rewards</div>
                    <div className="text-lg font-bold">
                      {formatNumber(results.monthlyRewards)} ICHZ
                    </div>
                    <div className="text-xs text-muted-foreground">
                      ≈ {formatCurrency(results.monthlyRewardsUSD, 'USD')}
                    </div>
                  </div>
                </div>

                <Button className="w-full wallet-button">
                  Start Staking
                </Button>

                <div className="flex items-start gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg text-sm">
                  <Info size={16} className="text-blue-400 mt-0.5" />
                  <div className="text-blue-400">
                    <p className="font-semibold mb-1">Important Notes:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Staking rewards are estimated and may vary</li>
                      <li>• Early withdrawal may incur penalties</li>
                      <li>• APY rates are subject to change</li>
                      <li>• Rewards are automatically compounded</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pools" className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stakingPeriods.map((pool, index) => (
                <Card key={index} className="border-primary/20">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{pool.label} Pool</CardTitle>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {pool.apy}% APY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Lock Period</span>
                        <span className="font-semibold">{pool.days} days</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Min Stake</span>
                        <span className="font-semibold">100,000 ICHZ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Staked</span>
                        <span className="font-semibold">{formatNumber(Math.random() * 50000000 + 10000000)} ICHZ</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Participants</span>
                        <span className="font-semibold">{Math.floor(Math.random() * 1000 + 100)}</span>
                      </div>
                    </div>

                    <Button 
                      className="w-full"
                      onClick={() => handlePeriodSelect(pool)}
                    >
                      <Clock size={16} className="mr-2" />
                      Stake Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default StakingCalculator


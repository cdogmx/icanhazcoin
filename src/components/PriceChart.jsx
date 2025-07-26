import React, { useState } from 'react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts'
import { TrendingUp, TrendingDown, BarChart3, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { useTokenPrice } from '../hooks/useTokenData'
import { formatCurrency, formatNumber } from '../lib/web3'

export const PriceChart = () => {
  const { current, change24h, history } = useTokenPrice()
  const [timeframe, setTimeframe] = useState('24H')
  const [chartType, setChartType] = useState('area')

  const timeframes = ['1H', '24H', '7D', '30D']

  const formatXAxis = (tickItem) => {
    const date = new Date(tickItem)
    if (timeframe === '1H' || timeframe === '24H') {
      return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const formatTooltip = (value, name, props) => {
    if (name === 'price') {
      return [formatCurrency(value, 'USD'), 'Price']
    }
    if (name === 'volume') {
      return [formatCurrency(value, 'USD'), 'Volume']
    }
    return [value, name]
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm text-muted-foreground">
            {new Date(label).toLocaleString()}
          </p>
          <p className="text-lg font-semibold">
            Price: {formatCurrency(data.price, 'USD')}
          </p>
          <p className="text-sm text-muted-foreground">
            Volume: {formatCurrency(data.volume, 'USD')}
          </p>
        </div>
      )
    }
    return null
  }

  const isPositive = change24h >= 0

  return (
    <Card className="card-glow">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CardTitle className="flex items-center gap-2">
              <Activity className="text-primary" size={20} />
              ICHZ Price Chart
            </CardTitle>
            <Badge variant={isPositive ? "default" : "destructive"} className="flex items-center gap-1">
              {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {isPositive ? '+' : ''}{change24h.toFixed(2)}%
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant={chartType === 'area' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('area')}
              className="h-8 px-3"
            >
              <BarChart3 size={14} />
            </Button>
            <Button
              variant={chartType === 'line' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setChartType('line')}
              className="h-8 px-3"
            >
              <Activity size={14} />
            </Button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <div className="text-3xl font-bold gradient-text">
              {formatCurrency(current, 'USD')}
            </div>
            <div className="text-sm text-muted-foreground">
              Current Price
            </div>
          </div>
          
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <Button
                key={tf}
                variant={timeframe === tf ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setTimeframe(tf)}
                className="h-8 px-3 text-xs"
              >
                {tf}
              </Button>
            ))}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'area' ? (
              <AreaChart data={history}>
                <defs>
                  <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatXAxis}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  domain={['dataMin * 0.95', 'dataMax * 1.05']}
                  tickFormatter={(value) => formatCurrency(value, 'USD')}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  fill="url(#priceGradient)"
                />
              </AreaChart>
            ) : (
              <LineChart data={history}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="timestamp" 
                  tickFormatter={formatXAxis}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <YAxis 
                  domain={['dataMin * 0.95', 'dataMax * 1.05']}
                  tickFormatter={(value) => formatCurrency(value, 'USD')}
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, stroke: 'hsl(var(--primary))', strokeWidth: 2 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Chart Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-border">
          <div className="text-center">
            <div className="text-sm text-muted-foreground">24h High</div>
            <div className="font-semibold text-green-400">
              {formatCurrency(current * 1.15, 'USD')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">24h Low</div>
            <div className="font-semibold text-red-400">
              {formatCurrency(current * 0.92, 'USD')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">24h Volume</div>
            <div className="font-semibold">
              {formatCurrency(2500000, 'USD')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-sm text-muted-foreground">Market Cap</div>
            <div className="font-semibold">
              {formatCurrency(123000000, 'USD')}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PriceChart



import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Percent, Target, Award, AlertTriangle, BarChart3 } from 'lucide-react';

const PortfolioAnalytics = () => {
  // Portfolio performance data
  const performanceData = [
    { date: '2024-01', value: 100000, pnl: 0 },
    { date: '2024-02', value: 105000, pnl: 5000 },
    { date: '2024-03', value: 98000, pnl: -2000 },
    { date: '2024-04', value: 115000, pnl: 15000 },
    { date: '2024-05', value: 125000, pnl: 25000 },
    { date: '2024-06', value: 142340, pnl: 42340 }
  ];

  // Asset allocation data
  const allocationData = [
    { name: 'ETH', value: 35, amount: 49819, color: '#627EEA' },
    { name: 'BTC', value: 25, amount: 35585, color: '#F7931A' },
    { name: 'USDC', value: 20, amount: 28468, color: '#2775CA' },
    { name: 'LINK', value: 10, amount: 14234, color: '#375BD2' },
    { name: 'UNI', value: 6, amount: 8540, color: '#FF007A' },
    { name: 'Others', value: 4, amount: 5694, color: '#8B5CF6' }
  ];

  // Risk metrics
  const riskMetrics = [
    { metric: 'Sharpe Ratio', value: '1.85', status: 'good', icon: Award },
    { metric: 'Max Drawdown', value: '-12.5%', status: 'moderate', icon: AlertTriangle },
    { metric: 'Volatility', value: '24.3%', status: 'moderate', icon: BarChart3 },
    { metric: 'Beta', value: '0.89', status: 'good', icon: Target }
  ];

  // Yield tracking data
  const yieldData = [
    { protocol: 'Aave', asset: 'USDC', apr: '4.2%', earned: '$1,250', risk: 'Low' },
    { protocol: 'Compound', asset: 'ETH', apr: '3.8%', earned: '$2,100', risk: 'Low' },
    { protocol: 'Uniswap V3', asset: 'ETH/USDC', apr: '12.5%', earned: '$3,400', risk: 'Medium' },
    { protocol: 'Yearn', asset: 'yvUSDC', apr: '5.1%', earned: '$980', risk: 'Medium' }
  ];

  const chartConfig = {
    value: {
      label: "Portfolio Value",
      color: "hsl(var(--chart-1))",
    },
    pnl: {
      label: "P&L",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Portfolio Analytics</h2>
          <p className="text-muted-foreground">Comprehensive analysis of your DeFi portfolio</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-primary">+42.34%</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">$42,340 gained</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Annualized Return</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold">+28.9%</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">vs 15.2% market</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Win Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-green-600">72%</span>
              <Percent className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">23/32 positions</p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Risk Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-orange-500">6.2/10</span>
              <AlertTriangle className="w-4 h-4 text-orange-500" />
            </div>
            <p className="text-sm text-muted-foreground">Moderate risk</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Allocation</TabsTrigger>
          <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
          <TabsTrigger value="yield">Yield Tracking</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>
                Track your portfolio value and profit/loss over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={chartConfig} className="h-[400px]">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsl(var(--primary))"
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="allocation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>
                  Breakdown of your portfolio by asset
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer config={chartConfig} className="h-[300px]">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="glass-card">
              <CardHeader>
                <CardTitle>Asset Details</CardTitle>
                <CardDescription>
                  Detailed breakdown with values
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {allocationData.map((asset, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: asset.color }}
                        />
                        <span className="font-medium">{asset.name}</span>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${asset.amount.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">{asset.value}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {riskMetrics.map((risk, index) => (
              <Card key={index} className="glass-card">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <risk.icon className="w-4 h-4" />
                    {risk.metric}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <span className={`text-2xl font-bold ${
                    risk.status === 'good' ? 'text-green-600' :
                    risk.status === 'moderate' ? 'text-orange-500' : 'text-red-500'
                  }`}>
                    {risk.value}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Risk Assessment</CardTitle>
              <CardDescription>
                Analysis of your portfolio risk profile and recommendations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-orange-50 dark:bg-orange-950/50 rounded-lg border border-orange-200 dark:border-orange-800">
                <h4 className="font-medium text-orange-800 dark:text-orange-200 mb-2">Risk Recommendations</h4>
                <ul className="space-y-1 text-sm text-orange-700 dark:text-orange-300">
                  <li>• Consider reducing exposure to volatile assets (currently 41%)</li>
                  <li>• Diversify into more stable yield-generating protocols</li>
                  <li>• Your correlation with market is 0.89 - consider uncorrelated assets</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield" className="space-y-6">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Yield Positions</CardTitle>
              <CardDescription>
                Track your earning positions across different protocols
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {yieldData.map((position, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-medium">{position.protocol}</p>
                        <p className="text-sm text-muted-foreground">{position.asset}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-8">
                      <div className="text-right">
                        <p className="font-medium text-green-600">{position.apr}</p>
                        <p className="text-sm text-muted-foreground">APR</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{position.earned}</p>
                        <p className="text-sm text-muted-foreground">Earned</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-2 py-1 rounded text-xs ${
                          position.risk === 'Low' ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300' :
                          position.risk === 'Medium' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300' :
                          'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                        }`}>
                          {position.risk} Risk
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PortfolioAnalytics;

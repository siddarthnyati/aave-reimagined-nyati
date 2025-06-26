import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import StrategyAllocationInterface from '@/components/learn/StrategyAllocationInterface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useWallet } from '@/contexts/WalletContext';
import { 
  Bot, 
  TrendingUp, 
  Shield, 
  Zap, 
  Target,
  Settings,
  Play,
  Pause,
  RefreshCw,
  AlertTriangle,
  Clock,
  DollarSign,
  Percent,
  Bell,
  Lock,
  BarChart3,
  ArrowRight,
  Activity,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PortfolioItem {
  symbol: string;
  name: string;
  current: number;
  target: number;
  value: number;
  change: number;
}

const AIStrategies = () => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const [activeStrategies, setActiveStrategies] = useState<Record<string, { active: boolean; allocation: number }>>({});
  const [activeStrategy, setActiveStrategy] = useState<string>('');
  const [showRebalanceModal, setShowRebalanceModal] = useState(false);
  const [isRebalancing, setIsRebalancing] = useState(false);
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [rebalanceThreshold, setRebalanceThreshold] = useState('5');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [gasLimit, setGasLimit] = useState('30');

  const portfolioData: PortfolioItem[] = [
    { symbol: 'BTC', name: 'Bitcoin', current: 45, target: 40, value: 45000, change: -5 },
    { symbol: 'ETH', name: 'Ethereum', current: 25, target: 30, value: 25000, change: 5 },
    { symbol: 'USDC', name: 'USD Coin', current: 15, target: 15, value: 15000, change: 0 },
    { symbol: 'SOL', name: 'Solana', current: 10, target: 10, value: 10000, change: 0 },
    { symbol: 'LINK', name: 'Chainlink', current: 5, target: 5, value: 5000, change: 0 }
  ];

  const totalValue = portfolioData.reduce((sum, item) => sum + item.value, 0);
  const estimatedCost = 45.50;
  const estimatedTime = '2-5 minutes';
  const projectedYieldChange = '+0.3%';

  const handleStrategyToggle = (strategyId: string, active: boolean, allocation: number) => {
    setActiveStrategies(prev => ({
      ...prev,
      [strategyId]: { active, allocation }
    }));
  };

  const handleRebalanceAndOptimize = () => {
    setShowRebalanceModal(true);
    
    // Enhanced rebalancing logic that includes lending optimization
    toast({
      title: "🔄 Rebalancing & Optimizing",
      description: "Rebalancing portfolio and moving funds to highest-yield lending opportunities...",
    });
  };

  const handleRebalance = () => {
    setShowRebalanceModal(true);
  };

  const handleActivateRebalance = async () => {
    setIsRebalancing(true);
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsRebalancing(false);
    setShowRebalanceModal(false);
    toast({
      title: "Portfolio Rebalanced Successfully",
      description: "Your portfolio has been optimized according to your target allocation.",
    });
  };

  const strategies = [
    {
      id: 'auto-supply',
      name: 'Auto Supply Strategy',
      description: 'Automatically supply idle assets to highest yield pools across multiple protocols',
      currentAPY: '8.4%',
      risk: 'Low',
      category: 'yield-optimization'
    },
    {
      id: 'smart-rebalancing',
      name: 'Smart Rebalancing',
      description: 'Continuously rebalance portfolio to maintain optimal allocation and maximize returns',
      currentAPY: '12.7%',
      risk: 'Medium',
      category: 'portfolio-management'
    },
    {
      id: 'liquidation-protection',
      name: 'Liquidation Protection',
      description: 'Monitor health factors and automatically adjust positions to prevent liquidations',
      currentAPY: '6.2%',
      risk: 'Low',
      category: 'risk-management'
    },
    {
      id: 'yield-farming',
      name: 'Advanced Yield Farming',
      description: 'Participate in high-yield farming opportunities with automated position management',
      currentAPY: '18.9%',
      risk: 'High',
      category: 'yield-optimization'
    }
  ];

  const automationFeatures = [
    {
      name: 'Auto Supply',
      description: 'Automatically supply idle assets to highest yield pools',
      enabled: true,
      savings: '+$2,340',
      lastExecution: '2 hours ago',
      aiSummary: 'Currently monitoring 4 idle USDC positions. Next optimization scheduled in 6 hours when gas prices drop below 25 gwei.'
    },
    {
      name: 'Smart Rebalancing',
      description: 'Rebalance portfolio when allocation drifts beyond threshold',
      enabled: true,
      savings: '+$1,890',
      lastExecution: '1 day ago',
      aiSummary: 'Portfolio is 3.2% away from target allocation. Rebalancing will trigger if ETH allocation exceeds 43% or drops below 37%.'
    },
    {
      name: 'Liquidation Protection',
      description: 'Auto-repay loans when health factor approaches danger zone',
      enabled: true,
      savings: 'Risk Protected',
      lastExecution: 'Never triggered',
      aiSummary: 'Monitoring health factor at 2.8. All positions are safe. Emergency repayment ready if health factor drops below 1.5.'
    },
    {
      name: 'Yield Optimization',
      description: 'Continuously monitor and move funds to better opportunities',
      enabled: false,
      savings: 'Potential +$980',
      lastExecution: 'Not active',
      aiSummary: 'Detected 2.3% higher yields available on Compound for USDC. Activation would migrate $15,000 for additional $980 annual yield.'
    }
  ];

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">AI Portfolio Rebalancing</span>
        </h1>
        <p className="text-muted-foreground">
          Automated portfolio optimization powered by advanced AI
        </p>
      </div>
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Portfolio Rebalancing
          </CardTitle>
          <CardDescription>
            AI-powered portfolio optimization based on your risk profile
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">Connect wallet to access AI portfolio optimization</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WalletGuard 
          title="Connect Wallet for AI Portfolio Optimization"
          description="Access advanced AI-powered portfolio rebalancing and automated optimization strategies."
          features={[
            "AI-powered portfolio rebalancing recommendations",
            "Real-time allocation analysis and optimization", 
            "Automated strategy execution with cost estimation",
            "Advanced risk management and protection"
          ]}
          showPreview={true}
          previewContent={previewContent}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="gradient-text flex items-center gap-2">
                  <Sparkles className="w-8 h-8" />
                  AI Portfolio Optimization
                </span>
              </h1>
              <p className="text-muted-foreground">
                Intelligent rebalancing and strategy automation for maximum returns
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                AI Active
              </Badge>
              <Badge variant="secondary">
                $4,230 Saved This Month
              </Badge>
            </div>
          </div>

          {/* Enhanced Portfolio Rebalancing Hero Section */}
          <Card className="glass-card mb-8">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="w-5 h-5" />
                    Portfolio Rebalancing & Yield Optimization
                  </CardTitle>
                  <CardDescription>
                    AI-powered portfolio optimization with automated lending for maximum yield
                  </CardDescription>
                </div>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                  <AlertTriangle className="w-3 h-3 mr-1" />
                  Optimization Available
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary mb-1">${totalValue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Portfolio Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600 mb-1">8.4%</div>
                  <div className="text-sm text-muted-foreground">Current APY</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600 mb-1">2.4</div>
                  <div className="text-sm text-muted-foreground">Health Factor</div>
                </div>
              </div>

              <div className="space-y-4">
                {portfolioData.map((item) => (
                  <div key={item.symbol} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                          {item.symbol[0]}
                        </div>
                        <div>
                          <p className="font-medium">{item.symbol}</p>
                          <p className="text-sm text-muted-foreground">{item.name}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">${item.value.toLocaleString()}</p>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">{item.current}% → {item.target}%</span>
                          {item.change !== 0 && (
                            <Badge variant={item.change > 0 ? "default" : "secondary"} className="text-xs">
                              {item.change > 0 ? '+' : ''}{item.change}%
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress 
                        value={item.current} 
                        className="flex-1 h-2" 
                      />
                      <span className="text-xs text-muted-foreground w-12">{item.current}%</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Rebalance & Optimize Impact</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Cost: ${estimatedCost}</span>
                    <span>Time: {estimatedTime}</span>
                    <span className="text-green-600">Yield: {projectedYieldChange}</span>
                    <span className="text-blue-600">APY Boost: +2.1%</span>
                  </div>
                </div>
                <Button onClick={handleRebalanceAndOptimize} className="btn-primary">
                  <Target className="w-4 h-4 mr-2" />
                  Rebalance & Optimize Yield
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Rebalance Confirmation Modal */}
          <Dialog open={showRebalanceModal} onOpenChange={setShowRebalanceModal}>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Confirm Portfolio Rebalancing
                </DialogTitle>
                <DialogDescription>
                  Review the proposed changes before activating the rebalancing strategy.
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-3">
                  <h4 className="font-semibold">Proposed Changes:</h4>
                  {portfolioData.filter(item => item.change !== 0).map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.symbol}</span>
                        <span className="text-sm text-muted-foreground">
                          {item.current}% → {item.target}%
                        </span>
                      </div>
                      <Badge variant={item.change > 0 ? "default" : "secondary"}>
                        {item.change > 0 ? 'Buy' : 'Sell'} ${Math.abs(item.change * totalValue / 100).toLocaleString()}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                  <div className="text-center">
                    <DollarSign className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">Estimated Cost</p>
                    <p className="text-lg font-bold">${estimatedCost}</p>
                  </div>
                  <div className="text-center">
                    <Clock className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-sm font-medium">Time to Complete</p>
                    <p className="text-lg font-bold">{estimatedTime}</p>
                  </div>
                  <div className="text-center">
                    <TrendingUp className="w-6 h-6 mx-auto mb-1 text-green-500" />
                    <p className="text-sm font-medium">Yield Impact</p>
                    <p className="text-lg font-bold text-green-600">{projectedYieldChange}</p>
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowRebalanceModal(false)}
                  disabled={isRebalancing}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleActivateRebalance}
                  disabled={isRebalancing}
                  className="btn-primary"
                >
                  {isRebalancing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Rebalancing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate Rebalancing
                    </>
                  )}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Tabs defaultValue="strategies" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">AI Strategies</TabsTrigger>
              <TabsTrigger value="active">Active Management</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className="glass-card">
                    <CardContent className="p-6">
                      <StrategyAllocationInterface
                        strategyName={strategy.name}
                        strategyDescription={strategy.description}
                        isActive={activeStrategies[strategy.id]?.active || false}
                        onToggle={(active, allocation) => handleStrategyToggle(strategy.id, active, allocation)}
                      />
                      
                      <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Current APY: <span className="font-bold text-green-500">{strategy.currentAPY}</span></span>
                        <span>Risk Level: <span className={`font-bold ${strategy.risk === 'Low' ? 'text-green-500' : strategy.risk === 'Medium' ? 'text-yellow-500' : 'text-red-500'}`}>{strategy.risk}</span></span>
                        <Badge variant="outline">{strategy.category}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      Active Strategies
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-primary">3</p>
                    <p className="text-sm text-muted-foreground">Running optimizations</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Total Savings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-green-600">$2,340</p>
                    <p className="text-sm text-muted-foreground">This month</p>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">Performance Boost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-2xl font-bold text-blue-600">+12.4%</p>
                    <p className="text-sm text-muted-foreground">vs manual trading</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {automationFeatures.filter(feature => feature.enabled).map((feature, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{feature.name}</h3>
                            <Badge variant="default">Active</Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{feature.description}</p>
                          
                          <div className="bg-gray-900 p-3 rounded-lg mb-4 border border-gray-700">
                            <div className="flex items-center gap-2 mb-1">
                              <Bot className="w-4 h-4 text-green-400" />
                              <span className="text-sm font-medium text-green-300">AI Analysis</span>
                            </div>
                            <p className="text-xs text-gray-300">{feature.aiSummary}</p>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Impact:</span>
                              <div className="font-medium text-green-400">{feature.savings}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Execution:</span>
                              <div className="font-medium">{feature.lastExecution}</div>
                            </div>
                          </div>
                        </div>
                        
                        <Button variant="destructive" size="sm" className="ml-4">
                          <Pause className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <div className="mb-6">
                <Card className="glass-card border-orange-200 bg-gradient-to-r from-orange-950 to-red-950 border-orange-800">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-orange-400" />
                      <span className="font-medium text-orange-300">Advanced User Settings</span>
                    </div>
                    <p className="text-sm text-orange-200 mt-1">
                      These settings are for experienced users only. Changes may affect strategy performance.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Trading Parameters
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium flex items-center gap-2">
                        <Percent className="w-4 h-4" />
                        Slippage Tolerance
                      </Label>
                      <RadioGroup value={slippageTolerance} onValueChange={setSlippageTolerance}>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0.1" id="slip-01" />
                            <Label htmlFor="slip-01">0.1%</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="0.5" id="slip-05" />
                            <Label htmlFor="slip-05">0.5%</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="1.0" id="slip-10" />
                            <Label htmlFor="slip-10">1.0%</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Rebalancing Threshold</Label>
                      <RadioGroup value={rebalanceThreshold} onValueChange={setRebalanceThreshold}>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="3" id="thresh-3" />
                            <Label htmlFor="thresh-3">3%</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="5" id="thresh-5" />
                            <Label htmlFor="thresh-5">5%</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="10" id="thresh-10" />
                            <Label htmlFor="thresh-10">10%</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Gas Price Limit (Gwei)</Label>
                      <RadioGroup value={gasLimit} onValueChange={setGasLimit}>
                        <div className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="20" id="gas-20" />
                            <Label htmlFor="gas-20">20</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="30" id="gas-30" />
                            <Label htmlFor="gas-30">30</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="50" id="gas-50" />
                            <Label htmlFor="gas-50">50</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>
                  </CardContent>
                </Card>

                <Card className="glass-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Risk Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Risk Tolerance</Label>
                      <RadioGroup value={riskTolerance} onValueChange={setRiskTolerance}>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="conservative" id="risk-con" />
                            <Label htmlFor="risk-con">Conservative (Low volatility)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="moderate" id="risk-mod" />
                            <Label htmlFor="risk-mod">Moderate (Balanced approach)</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="aggressive" id="risk-agg" />
                            <Label htmlFor="risk-agg">Aggressive (Higher returns)</Label>
                          </div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-sm font-medium">Emergency Stop</Label>
                        <p className="text-xs text-muted-foreground">Instantly pause all AI strategies</p>
                      </div>
                      <Button variant="destructive" size="sm">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Emergency Stop
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </WalletGuard>
      </main>
      <Footer />
    </div>
  );
};

export default AIStrategies;

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WalletGuard from '@/components/auth/WalletGuard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
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

const AIStrategies = () => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const [activeStrategy, setActiveStrategy] = useState<string>('');
  const [showSimulation, setShowSimulation] = useState(false);
  const [selectedStrategyForSim, setSelectedStrategyForSim] = useState<string>('');
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [rebalanceThreshold, setRebalanceThreshold] = useState('5');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [gasLimit, setGasLimit] = useState('30');

  const strategies = [
    {
      id: 'conservative',
      name: 'Conservative Rebalancing',
      description: 'Low-risk strategy focusing on stable yields with minimal volatility',
      allocation: { USDC: 50, DAI: 30, ETH: 20 },
      apy: '5.2%',
      risk: 'Low',
      performance: '+12.4%',
      sharpe: '1.8',
      maxDrawdown: '3.2%',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 'balanced',
      name: 'Balanced Growth',
      description: 'Moderate risk with optimized yield opportunities across protocols',
      allocation: { ETH: 40, USDC: 35, BTC: 15, LINK: 10 },
      apy: '8.7%',
      risk: 'Medium',
      performance: '+24.1%',
      sharpe: '2.1',
      maxDrawdown: '8.7%',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 'aggressive',
      name: 'Aggressive Yield',
      description: 'High-yield farming with dynamic rebalancing for maximum returns',
      allocation: { ETH: 35, UNI: 25, AAVE: 20, LINK: 20 },
      apy: '12.4%',
      risk: 'High',
      performance: '+38.9%',
      sharpe: '1.9',
      maxDrawdown: '15.3%',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      id: 'defi-native',
      name: 'DeFi Native',
      description: 'Focus on native DeFi tokens with governance participation rewards',
      allocation: { AAVE: 30, UNI: 25, COMP: 25, CRV: 20 },
      apy: '10.8%',
      risk: 'Medium-High',
      performance: '+31.7%',
      sharpe: '2.0',
      maxDrawdown: '12.1%',
      color: 'bg-orange-50 border-orange-200'
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

  const simulateStrategy = (strategyId: string) => {
    setSelectedStrategyForSim(strategyId);
    setShowSimulation(true);
  };

  const applyStrategy = () => {
    setActiveStrategy(selectedStrategyForSim);
    setShowSimulation(false);
    toast({
      title: "Strategy Applied",
      description: `${strategies.find(s => s.id === selectedStrategyForSim)?.name} is now active with optimized parameters.`,
    });
  };

  const currentAllocation = { ETH: 35, USDC: 40, BTC: 15, LINK: 10 };
  const selectedStrategy = strategies.find(s => s.id === selectedStrategyForSim);

  const previewContent = (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">
          <span className="gradient-text">AI Strategies</span>
        </h1>
        <p className="text-muted-foreground">
          Automated portfolio management powered by advanced AI
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {strategies.map((strategy) => (
          <Card key={strategy.id} className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {strategy.name}
                <Badge variant="secondary">{strategy.apy}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">{strategy.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Risk:</span>
                  <span>{strategy.risk}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Performance:</span>
                  <span className="text-green-600">{strategy.performance}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <WalletGuard 
          title="Connect Wallet for AI Strategies"
          description="Access advanced AI-powered portfolio management and automated optimization strategies."
          features={[
            "AI-powered portfolio optimization",
            "Advanced simulation and backtesting",
            "Automated rebalancing and yield farming",
            "Real-time risk management and protection"
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
                  AI Strategies
                </span>
              </h1>
              <p className="text-muted-foreground">
                Advanced portfolio management powered by artificial intelligence
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                {activeStrategy ? 'Strategy Active' : 'No Active Strategy'}
              </Badge>
              {activeStrategy && (
                <Badge variant="secondary">
                  {strategies.find(s => s.id === activeStrategy)?.name}
                </Badge>
              )}
            </div>
          </div>

          {/* Simulation Modal */}
          {showSimulation && selectedStrategy && (
            <Card className="mb-8 border-2 border-primary shadow-lg">
              <CardHeader className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Strategy Simulation: {selectedStrategy.name}
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Projected impact on your portfolio with detailed analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h4 className="font-semibold mb-3 text-gray-400">Current Portfolio</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Yield:</span>
                        <span className="font-medium">6.8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risk Level:</span>
                        <span className="font-medium">Medium</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Annual Earnings:</span>
                        <span className="font-medium">$9,520</span>
                      </div>
                      {Object.entries(currentAllocation).map(([asset, percentage]) => (
                        <div key={asset} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{asset}</span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold mb-3 text-green-400">Projected Portfolio</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Yield:</span>
                        <span className="font-medium text-green-400">{selectedStrategy.apy}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Risk Level:</span>
                        <span className="font-medium">{selectedStrategy.risk}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Annual Earnings:</span>
                        <span className="font-medium text-green-400">$12,180</span>
                      </div>
                      {Object.entries(selectedStrategy.allocation).map(([asset, percentage]) => (
                        <div key={asset} className="space-y-1">
                          <div className="flex justify-between text-xs">
                            <span>{asset}</span>
                            <span>{percentage}%</span>
                          </div>
                          <Progress value={percentage} className="h-1" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900 p-4 rounded-lg mb-4 border border-green-800">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="font-medium text-green-300">Projected Impact</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    Expected increase of <strong className="text-green-400">+$2,660 annual yield</strong> with managed risk exposure.
                    Implementation will occur gradually over 3-5 days to minimize slippage and gas costs.
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button onClick={applyStrategy} className="flex-1">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Apply Strategy
                  </Button>
                  <Button variant="outline" onClick={() => setShowSimulation(false)} className="flex-1">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="strategies" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="strategies">Strategies</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
              <TabsTrigger value="advanced">Advanced Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="strategies" className="space-y-6">
              {/* Strategy Selection - 2x2 Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {strategies.map((strategy) => (
                  <Card key={strategy.id} className={`glass-card transition-all hover:shadow-md ${activeStrategy === strategy.id ? 'ring-2 ring-primary' : ''}`}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-semibold">{strategy.name}</h3>
                            <Badge variant={strategy.risk === 'Low' ? 'secondary' : strategy.risk === 'Medium' ? 'default' : 'destructive'}>
                              {strategy.risk} Risk
                            </Badge>
                            <Badge variant="outline" className="bg-green-950 text-green-400 border-green-800">
                              {strategy.apy} APY
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-4">{strategy.description}</p>
                          
                          <div className="grid grid-cols-3 gap-4 text-sm mb-4">
                            <div>
                              <span className="text-muted-foreground">Performance</span>
                              <div className="font-bold text-green-400">{strategy.performance}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Sharpe Ratio</span>
                              <div className="font-bold">{strategy.sharpe}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Max Drawdown</span>
                              <div className="font-bold text-red-400">{strategy.maxDrawdown}</div>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-2 text-xs mb-4">
                            <div className="text-center font-medium text-muted-foreground mb-1">Target Allocation</div>
                            <div></div>
                            <div></div>
                            <div></div>
                            {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                              <div key={asset} className="text-center">
                                <div className="font-medium">{asset}</div>
                                <div className="text-muted-foreground">{percentage}%</div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-3">
                        <Button 
                          onClick={() => simulateStrategy(strategy.id)}
                          variant="outline"
                          className="flex-1"
                        >
                          <BarChart3 className="w-4 h-4 mr-2" />
                          Simulate Strategy
                        </Button>
                        {activeStrategy === strategy.id ? (
                          <Button variant="destructive" className="flex-1">
                            <Pause className="w-4 h-4 mr-2" />
                            Deactivate
                          </Button>
                        ) : (
                          <Button 
                            onClick={() => setActiveStrategy(strategy.id)}
                            className="flex-1"
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Activate
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <div className="mb-6">
                <Card className="glass-card bg-gradient-to-r from-gray-900 to-gray-800 border-green-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <Activity className="w-6 h-6 text-green-400" />
                      <h3 className="text-lg font-semibold text-white">AI Automation Status</h3>
                    </div>
                    <p className="text-sm text-gray-300 mb-4">
                      Your AI assistant is actively managing your portfolio with real-time optimizations and risk monitoring.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="font-bold text-2xl text-green-400">$4,230</div>
                        <div className="text-gray-400">Total AI Savings</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-2xl text-blue-400">24/7</div>
                        <div className="text-gray-400">Active Monitoring</div>
                      </div>
                      <div className="text-center">
                        <div className="font-bold text-2xl text-purple-400">156</div>
                        <div className="text-gray-400">Optimizations Made</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {automationFeatures.map((feature, index) => (
                  <Card key={index} className="glass-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-lg">{feature.name}</h3>
                            <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                              {feature.enabled ? 'Active' : 'Inactive'}
                            </Badge>
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
                              <div className={`font-medium ${feature.savings.includes('+') ? 'text-green-400' : feature.savings.includes('-') ? 'text-blue-400' : 'text-orange-400'}`}>
                                {feature.savings}
                              </div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Last Execution:</span>
                              <div className="font-medium">{feature.lastExecution}</div>
                            </div>
                          </div>
                        </div>
                        
                        <Button 
                          variant={feature.enabled ? "destructive" : "default"}
                          size="sm"
                          className="ml-4"
                        >
                          {feature.enabled ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
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

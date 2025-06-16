
import { useState } from 'react';
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
  Unlock,
  BarChart3
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AIStrategiesSection = () => {
  const { balance } = useWallet();
  const { toast } = useToast();
  const [activeStrategy, setActiveStrategy] = useState<string>('');
  const [slippageTolerance, setSlippageTolerance] = useState('0.5');
  const [rebalanceThreshold, setRebalanceThreshold] = useState('5');
  const [riskTolerance, setRiskTolerance] = useState('moderate');
  const [gasLimit, setGasLimit] = useState('30');
  const [maxPositionSize, setMaxPositionSize] = useState('25');
  const [stopLoss, setStopLoss] = useState('1.5');
  const [notifications, setNotifications] = useState(true);

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
      maxDrawdown: '3.2%'
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
      maxDrawdown: '8.7%'
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
      maxDrawdown: '15.3%'
    }
  ];

  const automationFeatures = [
    {
      name: 'Auto Supply',
      description: 'Automatically supply idle assets to highest yield pools',
      enabled: true,
      savings: '+$2,340',
      lastExecution: '2 hours ago'
    },
    {
      name: 'Smart Rebalancing',
      description: 'Rebalance portfolio when allocation drifts beyond threshold',
      enabled: true,
      savings: '+$1,890',
      lastExecution: '1 day ago'
    },
    {
      name: 'Liquidation Protection',
      description: 'Auto-repay loans when health factor approaches danger zone',
      enabled: true,
      savings: 'Risk Protected',
      lastExecution: 'Never triggered'
    },
    {
      name: 'Yield Optimization',
      description: 'Continuously monitor and move funds to better opportunities',
      enabled: false,
      savings: 'Potential +$980',
      lastExecution: 'Not active'
    },
    {
      name: 'Gas Optimization',
      description: 'Bundle transactions and execute during low gas periods',
      enabled: true,
      savings: '-$240 gas saved',
      lastExecution: '4 hours ago'
    }
  ];

  const toggleStrategy = (strategyId: string) => {
    if (activeStrategy === strategyId) {
      setActiveStrategy('');
      toast({
        title: "Strategy Disabled",
        description: `${strategies.find(s => s.id === strategyId)?.name} has been disabled.`,
      });
    } else {
      setActiveStrategy(strategyId);
      toast({
        title: "Strategy Activated",
        description: `${strategies.find(s => s.id === strategyId)?.name} is now active.`,
      });
    }
  };

  const currentAllocation = {
    ETH: 35,
    USDC: 40,
    BTC: 15,
    LINK: 10
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="w-6 h-6 text-primary" />
            AI Strategies
          </h2>
          <p className="text-muted-foreground">
            Automated portfolio management with advanced analytics and risk controls
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {activeStrategy ? 'Strategy Active' : 'No Active Strategy'}
          </Badge>
          {activeStrategy && (
            <Badge variant="secondary">
              {strategies.find(s => s.id === activeStrategy)?.name}
            </Badge>
          )}
        </div>
      </div>

      <Tabs defaultValue="strategies" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="strategies">Strategies</TabsTrigger>
          <TabsTrigger value="automation">Automation</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="strategies" className="space-y-6">
          {/* Current vs Target Allocation */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Portfolio Allocation
              </CardTitle>
              <CardDescription>
                Current allocation vs recommended targets
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(currentAllocation).map(([asset, percentage]) => (
                <div key={asset} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{asset}</span>
                    <span>{percentage}%</span>
                  </div>
                  <Progress value={percentage} className="h-2" />
                </div>
              ))}
              <Button className="w-full mt-4">
                <RefreshCw className="w-4 h-4 mr-2" />
                Rebalance Now
              </Button>
            </CardContent>
          </Card>

          {/* Strategy Selection - Radio Group */}
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Select Strategy (Choose One)</CardTitle>
              <CardDescription>
                Only one strategy can be active at a time to prevent conflicts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={activeStrategy} onValueChange={setActiveStrategy}>
                <div className="grid grid-cols-1 gap-4">
                  {strategies.map((strategy) => (
                    <div key={strategy.id} className="flex items-start space-x-3">
                      <RadioGroupItem value={strategy.id} id={strategy.id} className="mt-1" />
                      <Label htmlFor={strategy.id} className="flex-1 cursor-pointer">
                        <Card className={`transition-all ${activeStrategy === strategy.id ? 'ring-2 ring-primary shadow-md' : 'hover:shadow-sm'}`}>
                          <CardContent className="p-4">
                            <div className="space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <h3 className="font-semibold">{strategy.name}</h3>
                                  <p className="text-sm text-muted-foreground">{strategy.description}</p>
                                </div>
                                <Badge variant={strategy.risk === 'Low' ? 'secondary' : strategy.risk === 'Medium' ? 'default' : 'destructive'}>
                                  {strategy.risk}
                                </Badge>
                              </div>
                              
                              <div className="grid grid-cols-3 gap-4 text-sm">
                                <div>
                                  <span className="text-muted-foreground">APY</span>
                                  <div className="font-bold text-green-600">{strategy.apy}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Performance</span>
                                  <div className="font-bold text-blue-600">{strategy.performance}</div>
                                </div>
                                <div>
                                  <span className="text-muted-foreground">Max Drawdown</span>
                                  <div className="font-bold text-red-600">{strategy.maxDrawdown}</div>
                                </div>
                              </div>

                              <div className="space-y-2">
                                <h4 className="text-sm font-medium">Target Allocation</h4>
                                <div className="grid grid-cols-4 gap-2 text-xs">
                                  {Object.entries(strategy.allocation).map(([asset, percentage]) => (
                                    <div key={asset} className="text-center">
                                      <div className="font-medium">{asset}</div>
                                      <div className="text-muted-foreground">{percentage}%</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Label>
                    </div>
                  ))}
                </div>
              </RadioGroup>
              
              {activeStrategy && (
                <div className="mt-4 p-4 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm font-medium text-green-800">
                      {strategies.find(s => s.id === activeStrategy)?.name} is active
                    </span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {automationFeatures.map((feature, index) => (
              <Card key={index} className="glass-card">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-semibold">{feature.name}</h3>
                        <Badge variant={feature.enabled ? 'default' : 'secondary'}>
                          {feature.enabled ? 'Active' : 'Inactive'}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{feature.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-xs">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <div className={`font-medium ${feature.savings.includes('+') ? 'text-green-600' : feature.savings.includes('-') ? 'text-blue-600' : 'text-orange-600'}`}>
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

        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Trading Settings */}
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

            {/* Risk Management */}
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

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Max Position Size (%)
                  </Label>
                  <RadioGroup value={maxPositionSize} onValueChange={setMaxPositionSize}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="15" id="pos-15" />
                        <Label htmlFor="pos-15">15%</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="25" id="pos-25" />
                        <Label htmlFor="pos-25">25%</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="35" id="pos-35" />
                        <Label htmlFor="pos-35">35%</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" />
                    Stop Loss (Health Factor)
                  </Label>
                  <RadioGroup value={stopLoss} onValueChange={setStopLoss}>
                    <div className="flex gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1.2" id="stop-12" />
                        <Label htmlFor="stop-12">1.2</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1.5" id="stop-15" />
                        <Label htmlFor="stop-15">1.5</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1.8" id="stop-18" />
                        <Label htmlFor="stop-18">1.8</Label>
                      </div>
                    </div>
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Features */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  Advanced Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Smart Notifications</Label>
                    <p className="text-xs text-muted-foreground">Real-time alerts for important events</p>
                  </div>
                  <Button
                    variant={notifications ? "default" : "outline"}
                    size="sm"
                    onClick={() => setNotifications(!notifications)}
                  >
                    {notifications ? <Bell className="w-4 h-4" /> : <Bell className="w-4 h-4 opacity-50" />}
                  </Button>
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

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Strategy Lock</Label>
                    <p className="text-xs text-muted-foreground">Prevent accidental changes</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Lock className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Performance Monitoring */}
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Total AI Savings</span>
                    <div className="font-bold text-green-600">+$12,450</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Gas Optimized</span>
                    <div className="font-bold text-blue-600">-$340</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Risk Mitigated</span>
                    <div className="font-bold text-orange-600">$8,900</div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Strategies Run</span>
                    <div className="font-bold">247</div>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Clock className="w-4 h-4 mr-2" />
                  View Detailed Reports
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AIStrategiesSection;
